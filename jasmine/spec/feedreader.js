/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that URL is defined and not empty by looping through
         * each feed in the allFeeds object.
         */
        it('url defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* Test that name is defined and not empty by looping through
         * each feed in the allFeeds object.
         */
        it('name defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });


    /* New test suite named "The menu" */
    describe('The menu', function() {
        let body = document.querySelector('body');
        let menu = document.querySelector('.menu-icon-link');        
        
        /* Test that the menu element is hidden by default.
         */
        it('is hidden by default', function() {            
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* Test that the menu changes visibility when the
         * menu icon is clicked. Menu should toggles
         * between open and close when user clicks on icon.
         */
        it('visibility toggles when clicked', function() {
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        let feed = document.querySelector('.feed');
        let entry = feed.getElementsByClassName('entry');

        /* Test that there is at least a single entry loaded
         * when the loadFeed function is called.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('at least one entry found when loadFeed is called', function() {
            expect(entry.length).not.toBe(0);            
        });
    });

    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let feed = document.querySelector('.feed');
        let firstFeed,
            secondFeed;

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = feed.innerHTML;
                done();
            });
            loadFeed(1, function() {
                secondFeed = feed.innerHTML;
                done();
            });
        });

        it('content changes when new feed is loaded', function() {
            expect(firstFeed === secondFeed).toBe(false);
        });
    });
}());
