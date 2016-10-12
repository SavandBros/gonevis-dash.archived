describe('The TimeSince filter', function () {
  'use strict';

  var $filter;

  beforeEach(function () {
    module('gonevisDash');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('should not be null in filters', function() {
    expect($filter('timesince')).not.toBe(null);
  });

  it('should return 2 years', function () {
    var twoYearsAgo =  $filter('timesince')(new Date(new Date().setFullYear(new Date().getFullYear() - 2)));
    expect(twoYearsAgo).toEqual('2 years');
  });
});
