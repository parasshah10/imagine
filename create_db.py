import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database connection parameters
db_params = {
    'dbname': os.getenv('DB_NAME', 'defaultdb'),
    'user': os.getenv('DB_USER', 'avnadmin'),
    'password': os.getenv('DB_PASSWORD', 'AVNS_1WhwMIz3vFT7rhgh5NT'),
    'host': os.getenv('DB_HOST', 'pg-cd55329-dpptd-66be.e.aivencloud.com'),
    'port': os.getenv('DB_PORT', '19489'),
    'sslmode': 'require'
}

# Drop and create tables
def recreate_tables():
    drop_commands = (
        "DROP TABLE IF EXISTS images;",
        "DROP TABLE IF EXISTS batches;"
    )
    create_commands = (
        """
        CREATE TABLE batches (
            id SERIAL PRIMARY KEY,
            prompt TEXT NOT NULL,
            width INTEGER NOT NULL,
            height INTEGER NOT NULL,
            model VARCHAR(50) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE images (
            id SERIAL PRIMARY KEY,
            batch_id INTEGER REFERENCES batches(id),
            url TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn = None
    try:
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()
        
        # Drop existing tables
        for command in drop_commands:
            cur.execute(command)
        
        # Create new tables
        for command in create_commands:
            cur.execute(command)
        
        cur.close()
        conn.commit()
        print("Tables dropped and recreated successfully")
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error: {error}")
    finally:
        if conn is not None:
            conn.close()

if __name__ == '__main__':
    recreate_tables()
