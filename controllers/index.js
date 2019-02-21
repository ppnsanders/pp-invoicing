'use strict';

module.exports = (router) => {

    router.get('/', (req, res) => {
    	res.cookie('XSRF-TOKEN', res.locals._csrf) //setting a cookie that is accessible by Angular
        res.render('index', { component: 'createinv-page'})
    })

    router.get('/:page', (req, res) => {
    	res.cookie('XSRF-TOKEN', res.locals._csrf) //setting a cookie that is accessible by Angular
    	if(req.params.page === "config") {
    		res.render('index', { component: 'createinv-page'})
    	} else {
        	res.render('index', { component: req.params.page + '-page' })
        }
    })

}