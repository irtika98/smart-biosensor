from roboflow import Roboflow
import app.constants


MODEL = 0

run_status = False

if not run_status:
    rf = Roboflow(api_key=app.constants.API_KEY)
    project = rf.workspace().project(app.constants.PROJECT)
    MODEL = project.version(app.constants.VERSION).model

    run_status = True
