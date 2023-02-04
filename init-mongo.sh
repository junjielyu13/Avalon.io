mongo -- "avalon" <<EOF
    var rootUser = 'root';
    var rootPassword = 'password';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    var user = admin;
    var passwd = password;
    db.createUser({user: user, pwd: passwd, roles: ["readWrite"]});
EOF