const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = 'http://192.168.1.35:3002';
const should = chai.should();
const expect = chai.expect;
const sinon = require("sinon");

describe('POST sentences', () => {
    it('should Post toxicity of the sentence', done => {
        let sentence = 'I hate you and your sister'
        let status = sinon.stub();
      chai
        .request(app)
        .post('/')
        .send({sent :sentence})
        .end((err, res) => {
          res.should.have.status(200);
          //res.body.should.be.a('string');
          res.body.should.have.property('identity_attack');
          res.body.should.have.property('insult');
          res.body.should.have.property('obscene');
          res.body.should.have.property('severe_toxicity');
          res.body.should.have.property('threat');
          res.body.should.have.property('toxicity');
          let toxicity = res.body.toxicity 
          expect(toxicity > 0.50)
          expect(status.calledOnce).to.be.false;
          //console.log(res.body)
        done();
        });
    });
  });

