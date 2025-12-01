exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'text', notNull: true, unique: true },
    password: { type: 'text', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
