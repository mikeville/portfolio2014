var Project = Backbone.Model.extend({
    defaults: {
        title: "Project Title"
    }
})


var ProjectsCollection = Backbone.Collection.extend({
    model: Project,
    initialize: function(){
        var self = this;
        var projectsList = ["pinterest", "billboard", "another"]

        _.each(projectsList, function(project){
            self.add({
                title: project
            })
        })
    }
})

var ProjectsIndex = Backbone.View.extend({
    initialize: function(){
        this.collection = new ProjectsCollection;
        this.render();
    },
    el: function(){
        return $('#projects_index')
    },
    render: function(){
        var self = this
        _.each(this.collection.models, function(project){
            var projectTeaser = new ProjectTeaser({
                model: project,
                className: "teaser_container"
            });
            self.$el.append(projectTeaser.render().$el)
        })
    }
})

var ProjectTeaser = Backbone.View.extend({
    events: {
        "click .el": "openProject"
        //mouse-hover event
    },
    initialize: function(){
        this.render();
    },
    template: function(attrs){
        html_string = $('#teaser_template').html();
        //for template image path: projects/<%= title %>/thumb<%= title %>.gif
        var template_func = _.template(html_string)
        return template_func(attrs)
    },
    render: function(){
        this.$el.html(this.template(this.model.attributes))
        return this
    },
    openProject: function(){

    }
})


var ProjectContent = Backbone.View.extend({

})


$(window).load(function(){
    var projectsIndex = new ProjectsIndex();


    var $container = $('#projects_index');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    }); 




});
