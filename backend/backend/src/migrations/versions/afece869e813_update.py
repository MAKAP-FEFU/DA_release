"""update

Revision ID: afece869e813
Revises: c0863c33a2b0
Create Date: 2024-12-01 01:38:48.233830

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'afece869e813'
down_revision: Union[str, None] = 'c0863c33a2b0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('models', sa.Column('created_at', sa.Date(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('models', 'created_at')
    # ### end Alembic commands ###
