from collections import namedtuple
import subprocess
import itertools
import argparse
import time

Snapshot = namedtuple("Snapshot", ["dataset", "snapshot"])


def parse_snapshot(snapshot):
    print(snapshot)
    segments = tuple(snapshot.split("@"))
    if len(segments) != 2:
        return None
    return Snapshot(*segments)


def get_snapshots():
    p = subprocess.Popen(
        "zfs list -t snapshot -o name".split(" "), stdout=subprocess.PIPE)
    snapshots = p.stdout.read().decode("ascii").split("\n")
    p.wait()
    return filter(lambda x: x, map(parse_snapshot, snapshots))


def destroy_snapshots(snapshot):
    # NOTE: the input is not sanatized
    subprocess.Popen(["zfs", "destroy"] +
                     [snapshot.dataset + "@" + snapshot.snapshot]).wait()


def prune(keep, dryrun=False):
    snapshots_to_remove = []
    for dataset, snapshots in itertools.groupby(sorted(get_snapshots()), key=lambda snap: snap.dataset):
        zsys_snapshots = [
            snapshot for snapshot in snapshots if snapshot.snapshot.startswith("autozsys_")]
        snapshots_to_remove.extend(zsys_snapshots[:-keep])
    if len(snapshots_to_remove) == 0:
        print("no snapshots need removal.")
        return
    print("removing snapshots: \n\t- " + "\n\t- ".join(
        [snapshot.dataset + "@" + snapshot.snapshot for snapshot in snapshots_to_remove]))

    if not args.dryrun:
        now = time.time()
        for snapshot in snapshots_to_remove:
            destroy_snapshots(snapshot)
        print("Removed snapshots (took %.2fs)" % (time.time() - now))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Prune autozsys snapshots past a certain count')
    parser.add_argument('--keep', type=int, default=5,
                        help="Number of snapshots to keep")
    parser.add_argument('--dryrun', action='store_true',
                        help="Dry run -- do not actually remove snapshots.")

    args = parser.parse_args()

    prune(args.keep, dryrun=args.dryrun)
