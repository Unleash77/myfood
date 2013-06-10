var db = openDatabase ("database", "1.0", "database", 65535);

function create_db() {
        
    
        var sql = "CREATE TABLE types " +
                    " (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                    "name VARCHAR(100) NOT NULL); ";
        
        db.transaction (function (transaction) 
        {
            transaction.executeSql (sql, undefined);
        });		
        
        var sql2 = " CREATE TABLE purposes " +
                " (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(100) NOT NULL); ";
            
        db.transaction (function (transaction) 
        {
            transaction.executeSql (sql2, undefined);
        });
        
        var sql3 = "CREATE TABLE products " +
                " (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(100) NOT NULL, " + 
                "type_id INTEGER(10) NOT NULL, " + 
                "creation_date VARCHAR(100) NOT NULL, " + 
                "deadline_date VARCHAR(100) NOT NULL, " + 
                "count INTEGER(10) NOT NULL, " + 
                "calories INTEGER(10) NOT NULL, " + 
                "proteins INTEGER(10) NOT NULL, " + 
                "carbohydrates INTEGER(10) NOT NULL, " + 
                "fats INTEGER(10) NOT NULL); ";
            
        db.transaction (function (transaction) 
        {
            transaction.executeSql (sql3, undefined);
        });
}

function delete_db() {
    
    db.transaction (function (transaction) 
    {
        var sql = "DROP TABLE types";
        transaction.executeSql (sql, undefined);
    });
    db.transaction (function (transaction) 
    {
        var sql = "DROP TABLE purposes";
        transaction.executeSql (sql, undefined);
    });
    db.transaction (function (transaction) 
    {
        var sql = "DROP TABLE products";
        transaction.executeSql (sql, undefined, ok("done!"), error);
    });
}

function add_to_products(name,count,type,deadline_date,calories,proteins,carbohydrates,fats) {
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    if (month < 10) {
        month = '0'+month;
    }
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var today = year+"-"+month+"-"+day;
    
    db.transaction (function (transaction) 
    {
        var sql = "INSERT INTO products (name, type_id, creation_date, deadline_date, count, calories, proteins, carbohydrates, fats ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        transaction.executeSql (sql, [name, type, today, deadline_date, count, calories, proteins, carbohydrates, fats], function ()
            { 
                alert('dodano!');
            }, error);
    });
}