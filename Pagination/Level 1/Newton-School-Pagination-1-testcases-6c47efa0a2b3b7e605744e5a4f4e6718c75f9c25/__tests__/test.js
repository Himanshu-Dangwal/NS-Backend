const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const assert = chai.assert;
const sinon = require('sinon');
const app = require('../src/app');
var products   =require("../models/product.js");
const { json } = require('mocha/lib/reporters');
const { object, number, func } = require('joi');
const { compare } = require('bcrypt');

chai.use(chaiHttp);

//connect to DB
const url = "mongodb://mongoService:27017/products";

const suffix = [
    '', '?offset=3', '?limit=4', '?offset=1&limit=11', '?offset=2&limit=3', '?offset=1001'
 ];

offsets = [
    0, 3, 0, 1, 2, 1001
];
limits = [
    5, 5, 4, 5, 3, 5
];


//function to check the correct answer

async function get_val(ind){

    result = await products.find({});
    var ids = [];
    var limit=limits[ind], offset=offsets[ind];
    const start = (limit*offset);
    for(var i = start; i < result.length && i < (start+limit); i++) ids.push(result[i]["_id"]);
    ids.sort();
    return ids;

}

describe('Checking Pagination ', () => {


    before(async () => {
        await mongoose.connect(process.env.DATABASE_URL || url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('connected to DB');
        // await seedWithDummyData();
    });

    after(async () => {
        await mongoose.disconnect();
        console.log('disconnected DB')
    });


//     describe('Validating the Testcases', function(){

        
        it('Checking /'+suffix[0], async ()=> {

            var url = '/'+suffix[0];
            const res = await chai.request(app).get(url);
            expect(res).to.have.status(200);
            var ans_id = await get_val(0);
            var res_id = res.body;
            res_id.sort();

            expect(ans_id.length).to.equal(res_id.length);
            if(ans_id.length == res_id.length){
                for(var i=0; i< res_id.length; i++){
                    expect(String(ans_id[i])).to.equal(String(res_id[i]));
                }
            }

        });

        it('Checking /'+suffix[1], async ()=> {

            var url = '/'+suffix[1];
            const res = await chai.request(app).get(url);
            expect(res).to.have.status(200);
            var ans_id = await get_val(1);
            var res_id = res.body;
            res_id.sort();

            expect(ans_id.length).to.equal(res_id.length);
            if(ans_id.length == res_id.length){
                for(var i=0; i< res_id.length; i++){
                    expect(String(ans_id[i])).to.equal(String(res_id[i]));
                }
            }

        });

        it('Checking /'+suffix[2], async ()=> {

            var url = '/'+suffix[2];
            const res = await chai.request(app).get(url);
            expect(res).to.have.status(200);
            var ans_id = await get_val(2);
            var res_id = res.body;
            res_id.sort();

            expect(ans_id.length).to.equal(res_id.length);
            if(ans_id.length == res_id.length){
                for(var i=0; i< res_id.length; i++){
                    expect(String(ans_id[i])).to.equal(String(res_id[i]));
                }
            }

        });

        it('Checking /'+suffix[3], async ()=> {

            var url = '/'+suffix[3];
            const res = await chai.request(app).get(url);
            expect(res).to.have.status(200);
            var ans_id = await get_val(3);
            var res_id = res.body;
            res_id.sort();

            expect(ans_id.length).to.equal(res_id.length);
            if(ans_id.length == res_id.length){
                for(var i=0; i< res_id.length; i++){
                    expect(String(ans_id[i])).to.equal(String(res_id[i]));
                }
            }

        });

        it('Checking /'+suffix[4], async ()=> {

            var url = '/'+suffix[4];
            const res = await chai.request(app).get(url);
            expect(res).to.have.status(200);
            var ans_id = await get_val(4);
            var res_id = res.body;
            res_id.sort();

            expect(ans_id.length).to.equal(res_id.length);
            if(ans_id.length == res_id.length){
                for(var i=0; i< res_id.length; i++){
                    expect(String(ans_id[i])).to.equal(String(res_id[i]));
                }
            }

        });

        it('Checking /'+suffix[5], async ()=> {

            var url = '/'+suffix[5];
            const res = await chai.request(app).get(url);
            expect(res).to.have.status(200);
            var ans_id = await get_val(5);
            var res_id = res.body;
            res_id.sort();

            expect(ans_id.length).to.equal(res_id.length);
            if(ans_id.length == res_id.length){
                for(var i=0; i< res_id.length; i++){
                    expect(String(ans_id[i])).to.equal(String(res_id[i]));
                }
            }

        });



//     });
});
