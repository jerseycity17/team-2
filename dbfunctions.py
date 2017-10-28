import sqlite3 
from sqlite3 import Error

def create_connection(db):
    try:
        conn = sqlite3.connect(db)
        return conn
    except Error as e:
        print(e)

def add_family(conn, fam_id, name, email, phone, manager, employment, homesituation, familycontact, contactmethod, lastcontact, info):
    sql = ('''
        INSERT INTO Families(FamilyID, FamilyName, FamilyEmail, FamilyPhone, ManagerID, Employment, HomeSituation, FamilyContact, ContactMethod, LastContact, AdditionalInfo)
        VALUES(?,?,?,?,?,?,?,?,?,?,?)''')
    cursor = conn.cursor()
    cursor.execute(sql,(fam_id, name, email, phone, manager, employment, homesituation, familycontact, contactmethod, lastcontact, info))

#def add_casemanager(conn, man_id, user, pw, affil_id):
#    cursor = conn.cursor()
#    cursor.execute('''
#        INSERT INTO CaseManagers(ManagerID, Username, Password, AffiliateID)
#        VALUES(?,?,?,?)''',(man_id, user, pw, affil_id))

#def add_affiliate(conn, affil_id, name, address, web, email, phone):
#    cursor = conn.cursor()
#    cursor.execute('''
#        INSERT INTO Affiliates(AffiliateID, AffiliateName, AffiliateAddress, Website, AffiliateEmail, AffiliatePhone)
#        VALUES(?,?,?,?,?,?)''',(affil_id, name, address, web, email, phone))

def load_family(conn, fam_id):
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM Families
        WHERE FamilyID = ?""", (fam_id,))
    rows = cursor.fetchall()
    
    for row in rows:
        print(row)

def load_all_families(conn):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Families")

    rows = cursor.fetchall()

    for row in rows:
        print(row)

def insert_family(conn, family):
    sql = '''INSERT INTO Families(FamilyID, FamilyName, FamilyEmail, FamilyPhone, ManagerID, Employment, HomeSituation, FamilyContact, ContactMethod, LastContact, AdditionalInfo)
        VALUES(?,?,?,?,?,?,?,?,?,?,?)'''

    cursor = conn.cursor()
    cursor.execute(sql, family)

def delete_family(conn, fam_id):
    cursor = conn.cursor()
    cursor.execute('''DELETE
            FROM Families
            WHERE FamilyID = ?''', (fam_id,))

def main():
    database = 'database.db'
    family = (1, 'aName', 'email@email', "123-4567", 100, 'Employed', 'No Home', '', 'TEXT', '2017-10-28', '')

    conn = create_connection(database)

    with conn:
        #print("Query all Families")
        #load_all_families(conn)
        print("Insert Family")
        insert_family(conn, family)

        print("Query Families by ID")
        load_family(conn, 1)

        print("Delete Family")
        delete_family(conn, 1)

        print("Query Families by ID")
        load_family(conn, 1)

main()

