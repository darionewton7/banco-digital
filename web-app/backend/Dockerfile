# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
# Using --no-cache-dir to reduce image size
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application code into the container at /app
COPY src/ /app/src/

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable (optional, can be set in docker-compose)
# ENV FLASK_APP=src/main.py
# ENV FLASK_RUN_HOST=0.0.0.0

# Run main.py when the container launches
# Use gunicorn or waitress for production instead of Flask's dev server
# For simplicity in this example, we use the dev server
CMD ["python", "src/main.py"]

