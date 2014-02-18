var Project = Backbone.Model.extend({
    defaults: {
        title: "Project Title",
        description: ""
    }
})


var ProjectsCollection = Backbone.Collection.extend({
    model: Project,
    initialize: function(){
        var self = this;
        var projectsList = {"pinterest": "Pinterest logo",
                            "billboard": "Billboard charts redesign",
                            "pollen": "Magazine illustrations"}

        _.each(projectsList, function(value, key){
            self.add({
                title: key,
                description: value
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
        //WHY DOESN'T THIS HASH WORK?
        "click .teaser_container": "openProject"
    },
    initialize: function(){
        var self = this;
        var title = this.model.attributes.title
        this.render();
        this.$el.on("click", function(e){
            self.openProject(title)
        })
        this.$el.on("mouseover", this.mouseOverProject)
    },
    template: function(attrs){
        html_string = $('#teaser_template').html();
        var template_func = _.template(html_string)  
        return template_func(attrs)
    },
    render: function(){
        this.$el.html(this.template(this.model.attributes))
        return this
    },
    openProject: function(title){
        project_html = $('#project_template_'+title).html();
        var template_func = _.template(project_html)
        $('#project_container').html(template_func(title))

    },
    mouseOverProject: function(){
        // console.log("yall be hoverin")
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
