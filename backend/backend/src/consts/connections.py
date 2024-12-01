import enum


class ConnectionType(str, enum.Enum):
    ERROR = 'ERROR'
    ACTIVE = 'ACTIVE'
    INACTIVE = "INACTIVE"