app.factory('$service', function(){
  return {
    initApp : function(){


    //DROP DOWN MENU
    // Open
    $('.dropdown-fade, .btn-group-fade').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').fadeIn(250);
    });

    // Close
    $('.dropdown-fade, .btn-group-fade').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').fadeOut(250);
    });

    },

    initTableList: function(dataUrl) {
        $('.tasks-list').DataTable({
            autoWidth: false,
            ajax : dataUrl,
            processing: true,
            columns: [
            { "data": "objectId" },
            { "data": "title" },
            { "data": "annotation" },
            { "data": "createdAt" }
        ],
            order: [[ 0, 'desc' ]],
            dom: '<"datatable-header"fl><"datatable-scroll-lg"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filtro:</span> _INPUT_',
                lengthMenu: '<span>Mostrar:</span> _MENU_',
                paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
            },
            lengthMenu: [ 5, 25, 50, 75, 100 ],
            displayLength: 5,
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({page:'current'}).nodes();
                var last=null;

                // Select2
                $('.select').select2({
                    width: '150px',
                    minimumResultsForSearch: Infinity
                });

                // Reverse last 3 dropdowns orientation
                $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
            },
            preDrawCallback: function(settings) {

                // Reverse last 3 dropdowns orientation
                $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');

                // Destroy Select2
                $('.select').select2().select2('destroy');
            }
        });



        // External table additions
        // ------------------------------

        // Add placeholder to the datatable filter option
        $('.dataTables_filter input[type=search]').attr('placeholder','Filtro...');


        // Enable Select2 select for the length option
        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity,
            width: 'auto'
        });
    },

    initDataPicker: function() {
        $('.pickadate').pickadate({
            monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abil', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            today: 'Hoje',
            close: 'Fechar',
            clear: 'Limpar'
        });
    },

    initWizard : function() {
        $(".form-basic").formwizard({
            disableUIStyles: true,
            disableInputFields: false,
            inDuration: 150,
            outDuration: 150
        });
        // Cancel the post
        $(".form-post-cancel").formwizard({
            disableUIStyles: true,
            disableInputFields: false,
            formPluginEnabled: true,
            inDuration: 150,
            outDuration: 150,
            formOptions: {
                success: function(data){
                    swal({title: "Congratulations!", text: "You are registered now!", type: "success", timer: 2000, confirmButtonColor: "#43ABDB"})
                },
                dataType: 'json',
                resetForm: true, 
                beforeSubmit: function(){
                    return confirm("This is the beforeSubmit callback, do you want to submit?");
                },
                beforeSend: function(){
                    return confirm("This is the beforeSend callback, do you want to submit?");
                },
                beforeSerialize: function(){
                    return confirm("This is the beforeSerialize callback, do you want to submit?");
                }
            }
        });


        // With validation
        $(".form-validation").formwizard({
            disableUIStyles: true,
            validationEnabled: true,
            inDuration: 150,
            outDuration: 150,
            validationOptions: {
                ignore: 'input[type=hidden], .select2-input',
                errorClass: 'validation-error-label',
                successClass: 'validation-valid-label',
                highlight: function(element, errorClass) {
                    $(element).removeClass(errorClass);
                },
                unhighlight: function(element, errorClass) {
                    $(element).removeClass(errorClass);
                },
                errorPlacement: function(error, element) {
                    if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container') ) {
                        if(element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                            error.appendTo( element.parent().parent().parent().parent() );
                        }
                         else {
                            error.appendTo( element.parent().parent().parent().parent().parent() );
                        }
                    }
                    else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
                        error.appendTo( element.parent().parent().parent() );
                    }
                    else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                        error.appendTo( element.parent().parent() );
                    }
                    else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                        error.appendTo( element.parent().parent() );
                    }
                    else {
                        error.insertAfter(element);
                    }
                },
                rules: {
                    email: {
                        email: true
                    }
                }
            }
        });

        // Update single file input state
        $(".form-validation").on("step_shown", function(event, data) {
            $.uniform.update();
        });


        // AJAX form submit
        $(".form-ajax").formwizard({
            disableUIStyles: true,
            formPluginEnabled: true,
            disableInputFields: false,
            inDuration: 150,
            outDuration: 150,
            formOptions :{
                success: function(data){
                    swal({title: "Congratulations!", text: "You are registered now!", type: "success", timer: 2000, confirmButtonColor: "#43ABDB"})
                },
                beforeSubmit: function(data){
                    $("#ajax-data").css({borderTop: '1px solid #ddd', padding: 15}).html("<span class='text-semibold'>Data sent to the server:</span> " + $.param(data));
                },
                dataType: 'json',
                resetForm: true
            }
        });


        //
        // Add steps dynamically
        //

        // Initialize wizard
        $(".form-add-steps").formwizard({
            disableUIStyles: true,
            disableInputFields: false,
            inDuration: 150,
            outDuration: 150
        });


        // Append step on button click
        $("#add-step").on('click', function(){
            $(".step-wrapper").append($(".extra-steps .step:first"));
            $(".form-add-steps").formwizard("update_steps");  
            return false;
        });



        // Initialize plugins
        // ------------------------------

        // Select2 selects
        $('.select').select2();

        // Simple select without search
        $('.select-simple').select2({
            minimumResultsForSearch: Infinity
        });


        // Styled checkboxes and radios
        $('.styled').uniform({
            radioClass: 'choice'
        });


        // Styled file input
        $('.file-styled').uniform({
            wrapperClass: 'bg-danger',
            fileButtonHtml: '<i class="icon-googleplus5"></i>'
        });


        // Uncomment if you use styled checkboxes/radios to update them dynamically when step changed
        $(".form-basic, .form-validation, .form-add-steps, .form-ajax").on("step_shown", function(event, data){
            //$.uniform.update();
        });

    },
    // Panels, Reload elements
    panels: function() {
        $('.panel [data-action=reload]').click(function (e) {
            e.preventDefault();
            var block = $(this).parent().parent().parent().parent().parent();
            $(block).block({ 
                message: '<i class="icon-spinner9 spinner"></i>',
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait',
                    'box-shadow': '0 0 0 1px #ddd'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'none'
                }
            });

            // For demo purposes
            window.setTimeout(function () {
               $(block).unblock();
            }, 2000); 
        });

        $('.panel-collapsed').children('.panel-heading').nextAll().hide();


        // Rotate icon if collapsed by default
        $('.panel-collapsed').find('[data-action=collapse]').children('i').addClass('rotate-180');


        // Collapse on click
        $('.panel [data-action=collapse]').click(function (e) {
            e.preventDefault();
            var $panelCollapse = $(this).parent().parent().parent().parent().nextAll();
            $(this).parents('.panel').toggleClass('panel-collapsed');
            $(this).toggleClass('rotate-180');

            var availableHeight = $(window).height() - $('body > .navbar').outerHeight() - $('body > .navbar + .navbar').outerHeight() - $('body > .navbar + .navbar-collapse').outerHeight();

            $('.page-container').attr('style', 'min-height:' + availableHeight + 'px');

            $panelCollapse.slideToggle(150);
        });
    },

  }
});