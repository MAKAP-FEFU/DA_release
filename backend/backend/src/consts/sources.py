import enum


class SourceType(str, enum.Enum):
    API = 'API'
    DB = 'DB'
    DWH = 'DWH'