"""update

Revision ID: db2e85915964
Revises: 190bac9eaf80
Create Date: 2024-12-01 04:32:21.231465

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'db2e85915964'
down_revision: Union[str, None] = '190bac9eaf80'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('connections',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('model_id', sa.Integer(), nullable=False),
    sa.Column('source_id', sa.Integer(), nullable=False),
    sa.Column('last_connections', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['model_id'], ['models.id'], ),
    sa.ForeignKeyConstraint(['source_id'], ['sources.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('connections')
    # ### end Alembic commands ###
