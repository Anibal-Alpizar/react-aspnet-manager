<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<meta charset="UTF-8"/>
				<title>Reporte de Usuarios</title>
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

					.encargado {
					color: blue;
					}

					.asociado {
					color: green;
					}

					.admin {
					color: red;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<h2>Reporte de Usuarios</h2>
					<table class="table table-bordered">
						<thead class="thead-light">
							<tr>
								<th>Tipo</th>
								<th>Id</th>
								<th>Nombre</th>
								<th>Apellidos</th>
								<th>Email</th>
								<th>Rol</th>
							</tr>
						</thead>
						<tbody>
							<xsl:for-each select="//Encargado">
								<tr>
									<xsl:if test="Rol = 1">
										<xsl:attribute name="class">admin</xsl:attribute>
									</xsl:if>
									<xsl:if test="Rol = 2">
										<xsl:attribute name="class">encargado</xsl:attribute>
									</xsl:if>
									<td>Encargado</td>
									<td>
										<xsl:value-of select="Id"/>
									</td>
									<td>
										<xsl:value-of select="Nombre"/>
									</td>
									<td>
										<xsl:value-of select="Apellidos"/>
									</td>
									<td>
										<xsl:value-of select="Email"/>
									</td>
									<td>
										<xsl:choose>
											<xsl:when test="Rol = 1">Administrador</xsl:when>
											<xsl:when test="Rol = 2">Encargado</xsl:when>
											<xsl:otherwise>Asociado</xsl:otherwise>
										</xsl:choose>
									</td>
								</tr>
							</xsl:for-each>
							<xsl:for-each select="//Asociado">
								<tr class="asociado">
									<td>Asociado</td>
									<td>
										<xsl:value-of select="Id"/>
									</td>
									<td>
										<xsl:value-of select="Nombre"/>
									</td>
									<td>
										<xsl:value-of select="Apellidos"/>
									</td>
									<td>
										<xsl:value-of select="Email"/>
									</td>
									<td>Asociado</td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
