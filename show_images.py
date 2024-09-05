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

def show_images():
    conn = None
    try:
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()
        cur.execute("""
            SELECT i.id, b.prompt, b.aspect_ratio, i.url, i.created_at
            FROM images i
            JOIN batches b ON i.batch_id = b.id
            ORDER BY i.created_at DESC
            LIMIT 10
        """)
        rows = cur.fetchall()
        
        print("Latest 10 images:")
        print("----------------")
        for row in rows:
            print(f"ID: {row[0]}")
            print(f"Prompt: {row[1]}")
            print(f"Aspect Ratio: {row[2]}")
            print(f"URL: {row[3]}")
            print(f"Created At: {row[4]}")
            print("----------------")
        
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error: {error}")
    finally:
        if conn is not None:
            conn.close()

if __name__ == '__main__':
    show_images()
