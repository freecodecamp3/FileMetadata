
function heredoc(fn) {return fn.toString().split('\n').slice(1,-1).join('\n') + '\n';}
var indexPage = heredoc(function () {/*
	<!DOCTYPE html>
	<html>
	<body>
		<form id="file-form" enctype="multipart/form-data">
			<input type="file" name="files" />
			<input type="submit" value="Upload" />
		</form>
		
		<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				var files;
				$('input[type=file]').on('change', function(event) {
					files = event.target.files;
				});
				$('form').on('submit', function(event) {
					event.stopPropagation();
					event.preventDefault();

					var data = new FormData();
					$.each(files, function(key, value) {
						data.append('files', value);
					});
					
					$.ajax({
						url: window.location.origin + '/api/files',
						type: 'POST',
						data: data,
						cache: false,
						processData: false,
						contentType: false,
						error: function(jqXHR, textStatus, errorThrown) {
							alert('ERRORS: ' + textStatus);
						},
						success: function(data) {
							alert('FILE SIZE: ' + JSON.parse(data).fileSize);
						}
					});
				});
			});
		</script>
	</body>
	</html>
*/});


var express = require('express');
var app = express();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

app.get('/', function (req, res) {
	res.end(indexPage);
});

app.post('/api/files', upload.array('files', 10), function (req, res, next) {
	//console.log(req.files);
	//console.log(req.body);
	res.end(JSON.stringify({fileSize:req.files[0].size}));
});

app.listen(process.env.PORT || 5000);


