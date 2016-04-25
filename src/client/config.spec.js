/*jshint -W117 */
'use strict';
describe('app', function() {

    beforeEach(function() {
        bard.appModule('app');
        bard.inject('config', 'service');
    });

    it('should have version', function() {
        expect(config.version).to.equal('0.0.1');
    });

    it('should get data', function() {
        expect(service.getData()).to.equal(1111);
    });
});