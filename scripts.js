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

function get_products_filtered(taste_1, taste_2, taste_3, taste_4, taste_5, meal_1, meal_2, meal_3, meal_4, meal_5) {
    
    db.transaction (function (transaction) 
    {
        var first = 1;
        var part_one = 0;
        var part_two = 0;
        
        var sql = "SELECT * FROM products ";
        if (taste_1 == 1) {
            if (first == 1) {
                sql += 'WHERE ( ';
                first = 0;
                part_one = 1;
            }
            else {
                sql += 'OR ';
            }
            sql += "`taste_1` = "+taste_1+" ";
        }
        if (taste_2 == 1) {
            if (first == 1) {
                sql += 'WHERE ( ';
                first = 0;
                part_one = 1;
            }
            else {
                sql += 'OR ';
            }
            sql += "`taste_2` = "+taste_2+" ";
        }
        if (taste_3 == 1) {
            if (first == 1) {
                sql += 'WHERE ( ';
                first = 0;
                part_one = 1;
            }
            else {
                sql += 'OR ';
            }
            sql += "`taste_3` = "+taste_3+" ";
        }
        if (taste_4 == 1) {
            if (first == 1) {
                sql += 'WHERE ( ';
                first = 0;
                part_one = 1;
            }
            else {
                sql += 'OR ';
            }
            sql += "`taste_4` = "+taste_4+" ";
        }
        if (taste_5 == 1) {
            if (first == 1) {
                sql += 'WHERE ( ';
                first = 0;
                part_one = 1;
            }
            else {
                sql += 'OR ';
            }
            sql += "`taste_5` = "+taste_5+" ";
        }
        
        if (part_one == 1) {
            sql += " ) ";
        }
        
        if (meal_1 == 1) {
            if (first == 1) {
                sql += 'WHERE ';
                first = 0;
            }
            else if (part_one == 1) {
                sql += 'AND ( ';
                part_two = 1;
            }
            else {
                sql += 'OR ';
            }
            sql += "`meal_1` = "+meal_1+" ";
        }
        if (meal_2 == 1) {
            if (first == 1) {
                sql += 'WHERE ';
                first = 0;
            }
            else if (part_one == 1 && part_two == 0) {
                sql += 'AND ( ';
                part_two = 1;
            }
            else {
                sql += 'OR ';
            }
            sql += "`meal_2` = "+meal_2+" ";
        }
        if (meal_3 == 1) {
            if (first == 1) {
                sql += 'WHERE ';
                first = 0;
            }
            else if (part_one == 1 && part_two == 0) {
                sql += 'AND ( ';
                part_two = 1;
            }
            else {
                sql += 'OR ';
            }
            sql += "`meal_3` = "+meal_3+" ";
        }
        if (meal_4 == 1) {
            if (first == 1) {
                sql += 'WHERE ';
                first = 0;
            }
            else if (part_one == 1 && part_two == 0) {
                sql += 'AND ( ';
                part_two = 1;
            }
            else {
                sql += 'OR ';
            }
            sql += "`meal_4` = "+meal_4+" ";
        }
        if (meal_5 == 1) {
            if (first == 1) {
                sql += 'WHERE ';
                first = 0;
            }
            else if (part_one == 1 && part_two == 0) {
                sql += 'AND ( ';
                part_two = 1;
            }
            else {
                sql += 'OR ';
            }
            sql += "`meal_5` = "+meal_5+" ";
        }
        
        if (part_two == 1) {
            sql += " ) ";
        }
        
        sql += " ORDER BY `deadline_date` ASC";
        
        //alert(sql);
        
        transaction.executeSql (sql, undefined, 
        function (transaction, result)
        {
            var html = '';
            if (result.rows.length)
            {
                for (var i = 0; i < result.rows.length; i++) 
                {
                  var row = result.rows.item (i);
                  
                  html += '<tr class="tr_'+row.id+'">' +
                          '<td>' + row.name + '</td>' +
                          '<td class="count_'+row.id+'">' + row.count + '</td>' +
                          '<td>' + row.deadline_date + '</td>' +
                          '<td>' + row.calories + '</td>' +
                          '<td>' + row.proteins + '</td>' +
                          '<td>' + row.carbohydrates + '</td>' +
                          '<td>' + row.fats + '</td>' +
                          '<td><a onclick="add_one('+row.id+')"><img class="ui-icon ui-icon-plus plus"/></a> <a onclick="minus_one('+row.id+')"><img class="ui-icon ui-icon-minus minus"/></a> <a onclick="delete_one('+row.id+')"><img class="ui-icon ui-icon-delete delete"/></a></td>' +
                          '</tr>';        
                }   
            }
                $('#tbody1').html(html);
                $('#my-table').table( "refresh" );
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
                  
                  html += '<tr class="tr_'+row.id+'">' +
                          '<td>' + row.name + '</td>' +
                          '<td class="count_'+row.id+'">' + row.count + '</td>' +
                          '<td>' + row.deadline_date + '</td>' +
                          '<td>' + row.calories + '</td>' +
                          '<td>' + row.proteins + '</td>' +
                          '<td>' + row.carbohydrates + '</td>' +
                          '<td>' + row.fats + '</td>' +
                          '<td><a onclick="add_one('+row.id+')"><img class="ui-icon ui-icon-plus plus"/></a> <a onclick="minus_one('+row.id+')"><img class="ui-icon ui-icon-minus minus"/></a> <a onclick="delete_one('+row.id+')"><img class="ui-icon ui-icon-delete delete"/></a></td>' +
                          '</tr>';        
                }
                $('#tbody1').html(html);
                $('#my-table').table( "refresh" );
            }
        });
    });
}

function add_one(id) {

    db.transaction (function (transaction) 
    {
        var sql = "UPDATE products SET `count` = `count` + 1 WHERE `id` = "+id+" ";
        transaction.executeSql (sql, undefined, 
        function (transaction, result)
        {
            var count = parseInt($('.count_'+id).html());
            count += 1;
            $('.count_'+id).html(count)
        });
    });
    
}

function minus_one(id) {
    db.transaction (function (transaction) 
    {
        var sql = "UPDATE products SET `count` = `count` - 1 WHERE `id` = "+id+" ";
        transaction.executeSql (sql, undefined, 
        function (transaction, result)
        {
            var count = parseInt($('.count_'+id).html());
            count -= 1;
            $('.count_'+id).html(count)
        });
    });
}

function delete_one(id) {
    db.transaction (function (transaction) 
    {
        var sql = "DELETE FROM products WHERE `id` = "+id+" ";
        transaction.executeSql (sql, undefined, 
        function (transaction, result)
        {
            $('.tr_'+id).hide();
        });
    });
}

function get_deadlined() {
    db.transaction (function (transaction) 
    {
        var currentTime = new Date();
        var month = currentTime.getMonth() + 1;
        if (month < 10) {
            month = '0'+month;
        }
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var today = year+"-"+month+"-"+day;
        
        var sql = "SELECT * FROM products WHERE `count` > 0 AND `deadline_date` <= DATE('"+today+"','+1 days') ORDER BY `deadline_date` ASC";
        transaction.executeSql (sql, undefined, 
        function (transaction, result)
        {
            var html = '<li data-role="list-divider" role="heading" id="deadlined">Termin przydatności</li>';

            if (result.rows.length)
            {
                for (var i = 0; i < result.rows.length; i++) 
                {
                  var row = result.rows.item (i);
                  
                  if (row.deadline_date < today) {
                    html += '<li data-theme="a" data-icon="alert"><a data-transition="slide">'+row.name+' : '+row.deadline_date+'<span class="ui-li-count">'+row.count+'</span></a></li>';
                  }
                  else {
                    html += '<li data-theme="e" data-icon="alert"><a data-transition="slide">'+row.name+' : '+row.deadline_date+'<span class="ui-li-count">'+row.count+'</span></a></li>';
                  }
     
                }
                $('#listview1').html(html);
                $('#listview1').listview('refresh');
                //$('#my-table').table( "refresh" );
            }
            else {
                $('#listview1').html("");
            }
        });
    });
}

function get_outnumbered() {
    db.transaction (function (transaction) 
    {
        var sql = "SELECT * FROM products WHERE `count` <= 3  ORDER BY `count` ASC";
        transaction.executeSql (sql, undefined, 
        function (transaction, result)
        {
            var html = '<li data-role="list-divider" role="heading" id="counted">Zapasy</li>';

            if (result.rows.length)
            {
                for (var i = 0; i < result.rows.length; i++) 
                {
                  var row = result.rows.item (i);
                  
                  if (row.count == 0) {
                    html += '<li data-theme="a" data-icon="alert"><a data-transition="slide">'+row.name+' : '+row.count+'<span class="ui-li-count">'+row.deadline_date+'</span></a></li>';
                  }
                  else {
                    html += '<li data-theme="e" data-icon="alert"><a data-transition="slide">'+row.name+' : '+row.count+'<span class="ui-li-count">'+row.deadline_date+'</span></a></li>';
                  }
     
                }
                $('#listview2').html(html);
                $('#listview2').listview('refresh');
                //$('#my-table').table( "refresh" );
            }
            else {
                $('#listview2').html("");
            }
        });
    });
}