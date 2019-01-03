
	var isDateField =[];


	require(["text!/CustomSpace/ScratchPad/scratchBody.html"], function(template) {
		var cont = $(template)
		$('#scratchPadBody').append(cont);
		$("#btnGo").kendoButton({
			click: function() {
				$("#btnGo").blur();
				fetchData();
				
			}
		});
		function fetchData() {
			var db = $('#dbDropdown').val();
			if (db === 'ServiceManagement') {
				var dashId = "f131f8cb-2a35-fdfa-401d-46910ac2e6e1";
			}
			else {
				var dashId = "bade578e-6140-4cc1-a660-2f4388683423";
			}
			var qFields = $('#qFields')[0].value;
			var tableName = $('#tableName')[0].value;
			var whereClause = $('#whereClause')[0].value;

			if (whereClause === "") {
				var extraParams = "&qFields=" + qFields + "&tableName=" + tableName;
			}
			else {
				var extraParams = "&qFields=" + qFields + "&tableName=" + tableName + "&whereClause=" + whereClause;
			}

			$.ajax({
				url: "/api/v3/Dashboard/GetDashboardDataById/?dateFilterType=NoFilter&queryId=" + dashId + extraParams,
				dataType: "json",
				success: function (result) {
					generateGrid(result);
				},
				error: function (result) {
					console.log("error");
				},
				type: "GET",
				contentType: "application/json; charset=utf-8",
			});
		}
		function generateGrid(response) {
			var data = response;
			var model = generateModel(response);
			var newColumns = generateColumns(response);
			var grid = $("#scratch-grid");
			if (grid.data('kendoGrid')) {
				$('#scratch-grid-wrapper').empty();
				$('#scratch-grid-wrapper').append("<div id='scratch-grid'></div>");
				var grid = $("#scratch-grid");
			}
			var ds = new kendo.data.DataSource({
				data: data,
				pageSize: 10
			});
			grid.kendoGrid({
				pageSize: 10,

			  schema: {
				  model: model
			  },
			  columns: newColumns,
			  pageable: true, 
			  groupable: true,
			  filterable: true,
			  sortable: true
			});
			
			grid.data('kendoGrid').setDataSource(ds);
			//dataSource.sync();
		};
		  
		function generateColumns(response){
			var sampleDataItem = response[0];
			var columns = [];
			for (var x in sampleDataItem) {
				var column = {
					field: x,
					title: x
				};
				columns.push(column)
				
			};
			return columns;
		};

		function generateModel(response) {

			var sampleDataItem = response[0];

			var model = {};
			var fields = {};
			for (var property in sampleDataItem) {
			  if(property.indexOf("ID") !== -1){
				model["id"] = property;
			  }
			  var propType = typeof sampleDataItem[property];

			  if (propType === "number" ) {
				fields[property] = {
				  type: "number",
				  validation: {
					required: true
				  }
				};
				if(model.id === property){
				  fields[property].editable = false;
				  fields[property].validation.required = false;
				}
			  } else if (propType === "boolean") {
				fields[property] = {
				  type: "boolean"
				};
			  } else if (propType === "string") {
				var parsedDate = kendo.parseDate(sampleDataItem[property]);
				if (parsedDate) {
				  fields[property] = {
					type: "date",
					validation: {
					  required: true
					}
				  };
				  isDateField[property] = true;
				} else {
				  fields[property] = {
					validation: {
					  required: true
					}
				  };
				}
			  } else {
				fields[property] = {
				  validation: {
					required: true
				  }
				};
			  }
			}

			model.fields = fields;

			return model;
		};
	});  
