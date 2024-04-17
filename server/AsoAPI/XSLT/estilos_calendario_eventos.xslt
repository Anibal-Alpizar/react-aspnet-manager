<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<meta charset="UTF-8"/>
				<title>Calendario de Eventos</title>
				<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"/>
				<style>
					body {
					font-family: Arial, sans-serif;
					background-color: #f8f9fa;
					}

					.container {
					max-width: 800px;
					margin: 0 auto;
					padding: 20px;
					}

					h2 {
					text-align: center;
					margin-bottom: 20px;
					}

					table {
					width: 100%;
					border-collapse: collapse;
					background-color: #fff;
					}

					th, td {
					border: 1px solid #dee2e6;
					padding: 8px;
					}

					th {
					background-color: #f2f2f2;
					font-weight: bold;
					}

					.evento {
					background-color: #e9ecef;
					}

					.descripcion {
					font-style: italic;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<h2>Calendario de Eventos</h2>
					<table class="table table-bordered">
						<thead class="thead-light">
							<tr>
								<th>Nombre</th>
								<th>Fecha</th>
								<th>Descripción</th>
							</tr>
						</thead>
						<tbody>
							<xsl:for-each select="//Evento">
								<tr class="evento">
									<td>
										<xsl:value-of select="Nombre"/>
									</td>
									<td>
										<xsl:value-of select="Fecha"/>
									</td>
									<td class="descripcion">
										<xsl:value-of select="Descripcion"/>
									</td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
