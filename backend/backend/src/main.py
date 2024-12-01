from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from src.exceptions import CustomHTTPException
from src.api.users import router as user_router
from src.api.models import router as model_router
from src.api.sources import router as source_router
from src.api.connections import router as connection_router

app = FastAPI(root_path='/api')
app.include_router(user_router)
app.include_router(model_router)
app.include_router(source_router)
app.include_router(connection_router)
app.add_middleware(CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

@app.exception_handler(CustomHTTPException)
async def custom_http_exception_handler(request, exc: CustomHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content=exc.detail,
    )

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", reload=True, host='0.0.0.0', port=8000)