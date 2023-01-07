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

  // Hold value for evaluation
  let dumy = 'aaaaBBBBccccDDDDeeeeFFFF';
  let real = '';
  let myTitle = 'AAA';
  let myComment = 'AAA comment'
  
  suite('Routing tests', function() {
    suite('POST /api/books with title => create book object/expect book object', function() {
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({ title: myTitle })
          .end(function(err, res) {

            // Hold value
            real = res.body._id;

            // Evaluation
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, '_id', 'Book should contain _id');
            assert.property(res.body, 'title', 'Book should contain title');
            
            done();
          });
        //done();
      });
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'missing required field title');
            done();
          });
        //done();
      });
    });

    suite('GET /api/books => array of books', function(){
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'commentcount', 'Book should contain commentcount');
            assert.property(res.body[0], 'title', 'Book should contain title');
            assert.property(res.body[0], '_id', 'Book should contain _id');
            done();
          });
        //done();
      });      
    });

    suite('GET /api/books/[id] => book object with [id]', function(){
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get(`/api/books/${dumy}`)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'no book exists');
            done();
          });
        //done();
      });
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get(`/api/books/${real}`)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'commentcount', 'Book should contain commentcount');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            done();
          });
        //done();
      });
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post(`/api/books/${real}`)
          .send({ comment: myComment })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.isArray(res.body.comments, 'Comments should be array');
            assert.property(res.body, '_id', 'Book should contain _id');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, 'commentcount', 'Book should contain commentcount');
            done();
          });
        //done();
      });
      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post(`/api/books/${real}`)
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'missing required field comment');
            done();
          });
        //done();
      });
      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
          .post(`/api/books/${dumy}`)
          .send({ comment: 'AAA comment2' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'no book exists');
            done();
          });
        //done();
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {
      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .delete(`/api/books/${real}`)
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'delete successful');
            done();
          });
        //done();
      });
      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
          .delete(`/api/books/${dumy}`)
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, 'no book exists');
            done();
          });
        //done();
      });
    });
  });
  
  /* ---------------------------------------------------------------------- */  
});
