let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );

describe('Senders', function () {
    describe('GET /senders', () => {
        it('should return all the senders', function (done) {
            chai.request(server)
                .get('/senders')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (sender) => {
                        return {_id: sender._id}
                    });
                    expect(result).to.include({_id: 10001});
                    expect(result).to.include({_id: 10002});
                    expect(result).to.include({_id: 10003});
                    expect(result).to.include({_id: 10004});
                    expect(result).to.include({_id: 10005});
                    done();
                });
        });

    });
    describe('POST /senders', function () {
        it('should return confirmation message', function (done) {
            let sender = {
                _id: '131313',
                sendersName: "testName",
                senderMethod:"EMS",
                senderPhoneNumber: "test12334",
                senderAddress: "testLocation",
                postcode:"TESTCODE",
                sendDate:"2018-10-21"
            };
            chai.request(server)
                .post('/senders')
                .send(sender)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Sender Successfully Added!');
                    done();
                });
        });
    });

    describe('GET /senders/:id', () => {
        it('should return sender which id is test_id:131313', function (done) {
            chai.request(server)
                .get('/senders/131313')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (senders) => {
                        return {_id: senders._id}
                    });
                    expect(result).to.include({_id: 131313});
                    done();
                });
        });
    });

    describe('DELETE /senders/:id',()=>{
        it('should return delete confirmation message ', function(done) {
            chai.request(server)
                .delete('/senders/131313')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Sender Successfully Deleted!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/senders')
                .end(function(err, res) {
                    let result = _.map(res.body, (sender) => {
                        return { _id: sender._id};
                    }  );
                    expect(res.body.length).to.equal(5);
                    expect(result).to.include({_id: 10001});
                    expect(result).to.include({_id: 10002});
                    expect(result).to.include({_id: 10003});
                    expect(result).to.include({_id: 10004});
                    expect(result).to.include({_id: 10005});
                    done();
                });
        });
    })
});
