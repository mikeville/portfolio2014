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
                            "pollen": "Magazine illustrations",
                            "beatles": "Charting the Beatles",
                            "detox": "Doodles",
                            "fatty": "Music branding",
                            "schranghamer": "Schranghamer branding",
                            "statlas": "Statlas.co product design",
                            "zoo": "Apparel design",
                            "umbro": "Umbro infographics"
                        }

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
            self.openProject(self.model.attributes)
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
    openProject: function(attrs){
        var project_title_wrapper_html = $('#project_title_wrapper').html();
        var template_func = _.template(project_title_wrapper_html)
        $('#project_container').html(template_func(attrs))
        
        var project_content_html = $('#project_content_'+attrs.title).html();
        var project_content_html = $('#project_content_lorem').html();
        var template_func2 = _.template(project_content_html)
        $('#project_content').html(template_func2(attrs))

    },
    mouseOverProject: function(){
        // console.log("yall be hoverin")
    }
})


var ProjectContent = Backbone.View.extend({

})


var renderIndex = function(){
    var index_content_html = $('#index_content').html()
    var template_func = _.template(index_content_html)  
    $('#project_container').html(template_func)
}

var renderAbout = function(){
    var about_content_html = $('#about_content').html()
    var template_func = _.template(about_content_html)  
    $('#project_container').html(template_func)
}


var addEventsToTopLinks = function(){
    $('#mike_title').on("click", renderIndex)
    $('#nav_projects').on("click", renderIndex)
    $('#nav_about').on("click", renderAbout)
}

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

renderIndex();

addEventsToTopLinks();


});
