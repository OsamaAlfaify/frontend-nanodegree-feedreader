/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Ensure all feeds has url defined ', function () {
            for (i in allFeeds) {
                // check the definition of url's
                expect(allFeeds[i].url).toBeDefined();
                // check if the url empty
                expect(allFeeds[i].url).not.toBe('');
            }
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Ensure all feeds has name defined', function () {
            for (i in allFeeds) {
                // check the definition of all the names
                expect(allFeeds[i].name).toBeDefined();
                // check if names is empty
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    /*Write a new test suite named "The menu" */
    describe('The menu', function () {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Ensures the menu element is hidden',function () {
            var hiddenElements= $('body').hasClass('menu-hidden');
            // check if the menu is hidden
                expect(hiddenElements).toBe(true);
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('Ensures the visibility icon when is clicked', function() {
            // check the menu displays when clicked
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            //check the menu hide when clicked again
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });

        /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('Ensures feed container has at least 1 entry', function() {
            var entries = $('.feed').find('.entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    });

        /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var _1stFeedList;
        var _2ndFeedList;

        beforeEach(function(done) {
            loadFeed(1, function() {
                _1stFeedList = $('.feed').html();
                loadFeed(2, function() {
                    done();
                });
            });
        });
        afterEach(function() {
            loadFeed(0);
        });

        it('Ensures is loaded so load feed change the content', function() {
            expect(_1stFeedList).toBeDefined();
            _2ndFeedList = $('.feed').html();
            expect(_2ndFeedList).toBeDefined();
            expect(_1stFeedList).not.toEqual(_2ndFeedList);
        });
    });
}());
