/*
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       ----[ Keep the tests in the same order! ]----
 *       
 */

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

 /* ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!

  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  
  * ----[END of EXAMPLE TEST]----
  */

  /* ---------------------------------------------------------------------- 

  // Hold id for evaluation
  let dumy = 'AAAABBBBCCCCDDDDEEEEFFFF';
  let real;
  
  suite('Routing tests', function() {
    suite('POST /api/books with title => create book object/expect book object', function() {
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('api/books')
          .send({ title: 'AAA' })
          .end(function(err, res) {

            // Hold value
            real = res.body._id;

            // Evaluation
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body._id, real);
            assert.equal(res.body.title, 'AAA');
            
            done();
          });
      });
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('api/books')
          .send({})
          .end(function(err, res) {
            assert.equal(res, undefined);
            done();
          });
      });
    });

    suite('GET /api/books => array of books', function(){
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body[0].comments, []);
            assert.equal(res.body[0]._id, real);
            assert.equal(res.body[0].title, 'AAA');
            assert.equal(res.body[0].commentcount, 0);
            done();
          });
      });      
    });

    suite('GET /api/books/[id] => book object with [id]', function(){
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get(`api/books/${dumy}``)
          .end(function(err, res) {
            assert.equal(res, undefined);
            done();
          });
      });
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get(`api/books/${real}`)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body[0].comments, []);
            assert.equal(res.body[0]._id, real);
            assert.equal(res.body[0].title, 'AAA');
            assert.equal(res.body[0].commentcount, 0);
            done();
          });
      });
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post(`api/books/${real}`)
          .send({ comment: 'AAA comment1' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.comments[0], 'AAA comment1');
            assert.equal(res.body._id, real);
            assert.equal(res.body.title, 'AAA');
            assert.equal(res.body.commentcount, 1);
            done();
          });
      });
      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post(`api/books/${real}`)
          .send({})
          .end(function(err, res) {
            assert.equal(res, undefined);
            done();
          });
      });
      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
          .post(`api/books/${dumy}`)
          .send({})
          .end(function(err, res) {
            assert.equal(res, undefined);
            done();
          });
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {
      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        //done();
      });
      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        //done();
      });
    });
  
  /* ---------------------------------------------------------------------- */  
  
  
});
