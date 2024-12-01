import subprocess
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent.parent))

def createmigrations():
    subprocess.run(["alembic", "revision", "--autogenerate", "-m", 'update'])

def runmigration():
    subprocess.run(["alembic", "upgrade", "head"])


if __name__=="__main__":


    createmigrations()
    runmigration()