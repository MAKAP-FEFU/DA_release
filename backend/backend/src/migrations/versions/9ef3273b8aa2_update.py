"""update

Revision ID: 9ef3273b8aa2
Revises: afece869e813
Create Date: 2024-12-01 01:40:28.251225

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '9ef3273b8aa2'
down_revision: Union[str, None] = 'afece869e813'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sources',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('features', postgresql.JSON(astext_type=sa.Text()), nullable=False),
    sa.Column('creditional', sa.String(), nullable=True),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sources')
    # ### end Alembic commands ###