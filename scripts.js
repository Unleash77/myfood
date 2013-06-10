var db = openDatabase ("database", "1.0", "database", 65535);

function create_db() {
        
    
        var sql = "CREATE TABLE types " +
                    " (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                    "name VARCHAR(100) NOT NULL); ";
        
        db.transaction (function (transaction) 
        {
            transaction.executeSql (sql, undefined);
        });		
        
        db.transaction (function (transaction) 
        {
            var sql2 = "INSERT INTO types (name) VALUES (?)";

            transaction.executeSql (sql2, ["Nabiał"]);
            transaction.executeSql (sql2, ["Mięso"]);
            transaction.executeSql (sql2, ["Napój"]);
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
                "fats INTEGER(10) NOT NULL, " +
                "taste_1 INTEGER(1) NOT NULL, " + 
                "taste_2 INTEGER(1) NOT NULL, " + 
                "taste_3 INTEGER(1) NOT NULL, " + 
                "taste_4 INTEGER(1) NOT NULL, " + 
                "taste_5 INTEGER(1) NOT NULL, " + 
                "meal_1 INTEGER(1) NOT NULL, " + 
                "meal_2 INTEGER(1) NOT NULL, " + 
                "meal_3 INTEGER(1) NOT NULL, " + 
                "meal_4 INTEGER(1) NOT NULL, " + 
                "meal_5 INTEGER(1) NOT NULL); ";
                
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

function add_to_products(name,count,type,deadline_date,calories,proteins,carbohydrates,fats, taste_1, taste_2, taste_3, taste_4, taste_5, meal_1, meal_2, meal_3, meal_4, meal_5) {
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
        var sql = "INSERT INTO products (name, type_id, creation_date, deadline_date, count, calories, proteins, carbohydrates, fats, taste_1, taste_2, taste_3, taste_4, taste_5, meal_1, meal_2, meal_3, meal_4, meal_5 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)";
        transaction.executeSql (sql, [name, type, today, deadline_date, count, calories, proteins, carbohydrates, fats, taste_1, taste_2, taste_3, taste_4, taste_5, meal_1, meal_2, meal_3, meal_4, meal_5], function ()
            { 
                alert('dodano!');
            }, error);
    });
}

function add_to_type(name) {
    db.transaction (function (transaction) 
    {
        var sql = "INSERT INTO types (name) VALUES (?)";
        transaction.executeSql (sql, [name], function ()
            { 
                alert('dodano!');
            }, error);
    });
}

function get_types() {
    
    db.transaction (function (transaction) 
    {
        var sql = "SELECT * FROM types";
        transaction.executeSql (sql, undefined, 
        function (transaction, result)
        {
          var html = '';
          if (result.rows.length)
          {
                for (var i = 0; i < result.rows.length; i++) 
                {
                  var row = result.rows.item (i);
                  var name = row.name;
                  var id = row.id;
                  html += '<option value="'+id+'">'+name+'</option>';
                }
          }
          $('select[name="selecttype"]').html(html).selectmenu('refresh', true);
        });
    }); 
}

function get_products() {
    db.transaction (function (transaction) 
    {
        var sql = "SELECT * FROM products ORDER BY `deadline_date` ASC";
        transaction.executeSql (sql, undefined, 
        function (transaction, result)
        {
            var html = '';
            if (result.rows.length)
            {
                for (var i = 0; i < result.rows.length; i++) 
                {
                  var row = result.rows.item (i);
                  
                  html += '<tr>' +
                          '<td>' + row.name + '</td>' +
                          '<td>' + row.count + '</td>' +
                          '<td>' + row.deadline_date + '</td>' +
                          '<td>' + row.calories + '</td>' +
                          '<td>' + row.proteins + '</td>' +
                          '<td>' + row.carbohydrates + '</td>' +
                          '<td>' + row.fats + '</td>' +
                          '</tr>';        
                }
                $('#tbody1').html(html);
                $('#my-table').table( "refresh" );
            }
        });
    });
}