Ext.onReady(function() {
	MODx.add({
		xtype: 'EasyPack-panel-home'
	})
})
var EasyPack = function(config) {
	config = config || {}
	EasyPack.superclass.constructor.call(this, config)
}
Ext.extend(EasyPack, MODx.Component, { // Перечисляем группы, внутрь которых будем "складывать" объекты
	panel: {},
	window: {},
})
Ext.reg('EasyPack', EasyPack)
EasyPack = new EasyPack()
var elemTemplate0 = new Ext.XTemplate('<tpl for=".">\
						<div class="x-combo-list-item">\
							<tpl if="id">({id})</tpl>\
							<strong>{name}</strong><small>({category_name})</small>\
						</div>\
					</tpl>', {compiled: true})
var elemTemplate2 = new Ext.XTemplate('<tpl for=".">\
						<div class="x-combo-list-item">\
							<tpl if="id">({id})</tpl>\
							<strong>{templatename}</strong><small>({category_name})</small>\
						</div>\
					</tpl>', {compiled: true})
var elemTemplate3 = new Ext.XTemplate('<tpl for=".">\
						<div class="x-combo-list-item">\
							<strong>{text_lex}</strong><small>({parent}),({namespace})</small>\
						</div>\
					</tpl>', {compiled: true})
var elemTemplate4 = new Ext.XTemplate('<tpl for=".">\
						<div class="x-combo-list-item">\
							<strong>{name_trans}</strong><small>({namespace})</small>\
						</div>\
					</tpl>', {compiled: true})
var elemTemplate5 = new Ext.XTemplate('<tpl for=".">\
						<div class="x-combo-list-item">\
							<strong>{url}</strong><small>({snippet})</small>\
						</div>\
					</tpl>', {compiled: true})
var elemTemplate6 = new Ext.XTemplate('<tpl for=".">\
						<div class="x-combo-list-item">\
							<strong>({id}) {pagetitle}</strong><small>({uri})</small>\
						</div>\
					</tpl>', {compiled: true})
var ToolTip = {
	render: function(e) {
		if(e.toolTip && e.getEl()) {
			Ext.QuickTips.register({
				target: e.getEl(),
				text: e.toolTip
			})
		}
	}
}
var todata = function(str, key = 'name') {
	if(str) {
		var arr = JSON.parse(str)
		if(arr.constructor.name == 'Array' || arr.constructor.name == 'Object') {
			var res = []
			for(var i of arr) {
				var t = {}
				t[key] = i
				res.push(t)
			}
			return res
		}
	}
	return null
}
EasyPack.panel.Home = function(config) {
	config = config || {}
	var columns = [ // Добавляем ширину и заголовок столбца
		{
			dataIndex: 'id',
			width: 200,
			header: _('id'),
			sortable: true,
			extraExtEditor: {
				visible: false,
			},
			renderer: extraExt.grid.renderers.default
		},
		{
			dataIndex: 'name',
			width: 330,
			header: _('name'),
			sortable: true,
			extraExtRenderer: {
				preRenderer: function(val, e, b) {
					if(b.data.path_to_last_transport) {
						return `<a href="${b.data.path_to_last_transport}" title="${_('EasyPack.path_to_last_transport')}">${val}</a>`
					} else {
						return `${val}`
					}
				},
			},
			renderer: extraExt.grid.renderers.default,
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: 'textfield',
				fieldLabel: _('name'),
				allowBlank: false,
			},
		},
		{
			dataIndex: 'version',
			width: 200,
			header: _('version'),
			emptyText: '0.0.0-pl',
			defaultValue: '0.0.1-pl',
			sortable: true,
			extraExtEditor: {},
			tooltip: _('EasyPack.description.version'),
			renderer: extraExt.grid.renderers.default,
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: 'textfield',
				fieldLabel: _('version'),
				emptyText: '0.0.2-pl',
				allowBlank: false
			},
		},

		{
			dataIndex: 'date',
			width: 330,
			tooltip: _('EasyPack.description.date'),
			header: _('date'),
			sortable: true,
			extraExtEditor: {
				visible: false,
			},
			renderer: extraExt.grid.renderers.default,
			editor: {xtype: 'textfield'},
			extraExtEditor: {},
		},

		{
			dataIndex: 'chunks',
			width: 330,
			header: _('chunks'),
			tooltip: _('EasyPack.description.chunks'),
			sortable: true,
			renderer: extraExt.grid.renderers.JSON,
			extraExtRenderer: {
				popup: true,
			},
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.inputs.modComboSuper.xtype,
				fieldLabel: _('chunk'),
				name: 'chunks',
				id: 'add-' + this.ident + '-chunk',
				anchor: '99%',
				forceSelection: true,
				fields: ['id', 'name', 'category_name'],
				url: MODx.config.connector_url,
				baseParams: {
					action: 'element/chunk/getlist', combo: 1, sort: 'id',
					dir: 'DESK',
				},
				allowBlank: true,
				valueField: 'name',
				displayField: 'name',
				tpl: elemTemplate0
			},
		},
		{
			dataIndex: 'snippets',
			width: 330,
			header: _('snippets'),
			tooltip: _('EasyPack.description.snippets'),
			sortable: true,
			renderer: extraExt.grid.renderers.JSON,
			extraExtRenderer: {
				popup: true,
			},
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.inputs.modComboSuper.xtype,
				fieldLabel: _('snippet'),
				forceSelection: true,
				fields: ['id', 'name', 'category_name'],
				url: MODx.config.connector_url,
				baseParams: {
					action: 'element/snippet/getlist', combo: 1, sort: 'id',
					dir: 'DESK',
				},
				allowBlank: true,
				valueField: 'name',
				displayField: 'name',
				tpl: elemTemplate0
			},
		},
		{
			dataIndex: 'plugins',
			width: 330,
			header: _('plugins'),
			tooltip: _('EasyPack.description.plugins'),
			sortable: true,
			renderer: extraExt.grid.renderers.JSON,
			extraExtRenderer: {
				popup: true,
			},
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.inputs.modComboSuper.xtype,
				fieldLabel: _('plugin'),
				forceSelection: true,
				fields: ['id', 'name', 'category_name'],
				url: MODx.config.connector_url,
				baseParams: {
					action: 'element/plugin/getlist', combo: 1, sort: 'id',
					dir: 'DESK'
				},
				allowBlank: true,
				valueField: 'name',
				displayField: 'name',
				tpl: elemTemplate0
			},
		},
		{
			dataIndex: 'templates',
			width: 330,
			header: _('templates'),
			tooltip: _('EasyPack.description.templates'),
			sortable: true,
			renderer: extraExt.grid.renderers.JSON,
			extraExtRenderer: {
				popup: true,
			},
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.inputs.modComboSuper.xtype,
				fieldLabel: _('template'),
				forceSelection: true,
				fields: ['id', 'templatename', 'category_name'],
				url: MODx.config.connector_url,
				baseParams: {
					action: 'element/template/getlist', combo: 1, sort: 'id',
					dir: 'DESK',
				},
				allowBlank: true,
				valueField: 'templatename',
				displayField: 'templatename',
				tpl: elemTemplate2
			},
		},
		{
			dataIndex: 'resources',
			width: 330,
			header: _('resources'),
			tooltip: _('EasyPack.description.resources'),
			sortable: true,
			renderer: extraExt.grid.renderers.JSON,
			extraExtRenderer: {
				popup: true,
			},
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.inputs.modComboSuper.xtype,
				fieldLabel: _('resources'),
				forceSelection: true,
				fields: ['id', 'pagetitle', 'uri'],
				url: MODx.config.connector_url,
				baseParams: {
					action: 'resource/getlist', combo: 1, sort: 'id',
					dir: 'DESK',
				},
				allowBlank: true,
				valueField: 'id',
				displayField: 'id',
				tpl: elemTemplate6
			},
		},
		{
			dataIndex: 'menus',
			width: 330,
			header: _('edit_menu'),
			tooltip: _('EasyPack.description.menus'),
			sortable: true,
			renderer: extraExt.grid.renderers.JSON,
			extraExtRenderer: {
				popup: true,
			},
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.inputs.modComboSuper.xtype,
				fieldLabel: _('edit_menu'),
				forceSelection: true,
				fields: ['text', 'text_lex', 'parent', 'namespace'],
				url: MODx.config.connector_url,
				baseParams: {
					action: 'system/menu/getlist', combo: 1, sort: 'namespace',
					dir: 'DESK',
				},
				allowBlank: true,
				valueField: 'text',
				displayField: 'text',
				tpl: elemTemplate3
			},
		},
		{
			dataIndex: 'settings',
			width: 330,
			header: _('settings'),
			tooltip: _('EasyPack.description.settings'),
			sortable: true,
			renderer: extraExt.grid.renderers.JSON,
			extraExtRenderer: {
				popup: true,
			},
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.inputs.modComboSuper.xtype,
				fieldLabel: _('settings'),
				forceSelection: true,
				fields: ['key', 'name_trans', 'namespace'],
				url: MODx.config.connector_url,
				baseParams: {
					action: 'system/settings/getlist', combo: 1,
					sort: 'namespace',
					dir: 'ASC',
				},
				allowBlank: true,
				valueField: 'key',
				displayField: 'key',
				tpl: elemTemplate4
			},
		},

		{
			dataIndex: 'core',
			width: 330,
			header: _('EasyPack.core'),
			tooltip: _('EasyPack.description.core'),
			sortable: true,
			renderer: extraExt.grid.renderers.default,
			hidden: true,
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.browser.xtype,
				canSelectFile: false,
				fieldLabel: _('EasyPack.core'),
				tooltip: _('EasyPack.description.core'),
				listeners: ToolTip,
				anchor: '99%',
				allowBlank: true,
				rootVisible: true,
				source: MODx.config.default_media_source,
			}
		},
		{
			dataIndex: 'assets',
			width: 330,
			header: _('EasyPack.assets'),
			tooltip: _('EasyPack.description.assets'),
			sortable: true,
			hidden: true,
			renderer: extraExt.grid.renderers.default,
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.browser.xtype,
				canSelectFile: false,
				fieldLabel: _('EasyPack.assets'),
				tooltip: _('EasyPack.description.assets'),
				listeners: ToolTip,
				anchor: '99%',
				allowBlank: true,
				rootVisible: true,
				source: MODx.config.default_media_source,
			}
		},

		{
			dataIndex: 'requires',
			width: 330,
			header: _('EasyPack.requires'),
			tooltip: _('EasyPack.description.requires'),
			sortable: true,
			hidden: false,
			renderer: extraExt.grid.renderers.JSON,
			extraExtRenderer: {
				popup: true,
			},
			editor: {xtype: 'textarea'},
			extraExtEditor: {
				xtype: extraExt.inputs.popup.xtype,
				fields: []
			},
		},
		{
			dataIndex: 'readme',
			width: 330,
			tooltip: _('EasyPack.description.readme'),
			header: _('EasyPack.readme'),
			sortable: true,
			hidden: true,
			renderer: extraExt.grid.renderers.default,
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.browser.xtype,
				fieldLabel: _('EasyPack.readme'),
				tooltip: _('EasyPack.description.readme'),
				listeners: ToolTip,
				anchor: '99%',
				allowBlank: true,
				rootVisible: true,
				source: MODx.config.default_media_source,
			}
		},
		{
			dataIndex: 'changelog',
			width: 330,
			tooltip: _('EasyPack.description.changelog'),
			header: _('EasyPack.changelog'),
			sortable: true,
			hidden: true,
			renderer: extraExt.grid.renderers.default,
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.browser.xtype,
				fieldLabel: _('EasyPack.changelog'),
				tooltip: _('EasyPack.description.changelog'),
				listeners: ToolTip,
				anchor: '99%',
				allowBlank: true,
				rootVisible: true,
				source: MODx.config.default_media_source,
			}
		},

		{
			dataIndex: 'tables',
			width: 330,
			header: _('EasyPack.tables'),
			tooltip: _('EasyPack.description.tables'),
			sortable: true,
			hidden: true,
			renderer: extraExt.grid.renderers.JSON,
			extraExtRenderer: {
				popup: true,
			},
			editor: {
				xtype: extraExt.inputs.popup.xtype,
				defaultValue: JSON.stringify({'prefix': modx_prefix}),
				fields: [
					{
						xtype: extraExt.inputs.modComboSuper.xtype,
						fieldLabel: _('EasyPack.tables'),
						forceSelection: true,
						fields: ['key'],
						name: 'tables',
						url: easypackConnectorUrl,
						baseParams: {
							action: 'show/gettables', combo: 1,
						},
						allowBlank: true,
						valueField: 'key',
						displayField: 'key',
						listeners: ToolTip,
					},
					{
						xtype: 'textfield',
						fieldLabel: _('EasyPack.prefix'),
						name: 'prefix',
						id: 'add-' + this.ident + '-prefix',
						anchor: '99%',
						allowBlank: true,
						rootVisible: true,
						listeners: ToolTip,
					},
				]
			},
			extraExtEditor: {
				xtype: extraExt.inputs.popup.xtype,
				defaultValue: JSON.stringify({'prefix': modx_prefix}),
				fields: [
					{
						xtype: extraExt.inputs.modComboSuper.xtype,
						fieldLabel: _('EasyPack.tables'),
						forceSelection: true,
						fields: ['key'],
						name: 'tables',
						url: easypackConnectorUrl,
						baseParams: {
							action: 'show/gettables', combo: 1,
						},
						allowBlank: true,
						valueField: 'key',
						displayField: 'key',
						listeners: ToolTip,
					},
					{
						xtype: 'textfield',
						fieldLabel: _('EasyPack.prefix'),
						name: 'prefix',
						id: 'add-' + this.ident + '-prefix',
						anchor: '99%',
						allowBlank: true,
						rootVisible: true,
						listeners: ToolTip,
					},
				]
			},
		},

		{
			dataIndex: 'setup_option',
			width: 330,
			header: _('EasyPack.setup_option'),
			tooltip: _('EasyPack.description.setup_option'),
			sortable: true,
			renderer: extraExt.grid.renderers.default,
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.browser.xtype,
				fieldLabel: _('EasyPack.setup_option'),
				tooltip: _('EasyPack.description.setup_option'),
				listeners: ToolTip,
				anchor: '99%',
				allowBlank: true,
				rootVisible: true,
				allowedFileTypes: 'php',
				source: MODx.config.default_media_source,
			},
		},
		{
			dataIndex: 'php_resolver',
			width: 330,
			tooltip: _('EasyPack.description.php_resolver'),
			header: _('EasyPack.php_resolver'),
			sortable: true,
			renderer: extraExt.grid.renderers.default,
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.browser.xtype,
				fieldLabel: _('EasyPack.php_resolver'),
				canSelectFolder: false,
				tooltip: _('EasyPack.description.php_resolver'),
				listeners: ToolTip,
				anchor: '99%',
				allowBlank: true,
				rootVisible: true,
				allowedFileTypes: 'php',
				source: MODx.config.default_media_source,
			},
		},
		{
			dataIndex: 'license',
			width: 330,
			tooltip: _('EasyPack.description.license'),
			header: _('EasyPack.license'),
			sortable: true,
			hidden: true,
			renderer: extraExt.grid.renderers.default,
			editor: {xtype: 'textfield'},
			extraExtEditor: {
				xtype: extraExt.browser.xtype,
				canSelectFolder: false,
				fieldLabel: _('EasyPack.license'),
				tooltip: _('EasyPack.description.license'),
				listeners: ToolTip,
				anchor: '99%',
				allowBlank: true,
				rootVisible: true,
				source: MODx.config.default_media_source,
			},
		},
	]
	if(modUtil) {
		columns.push(
			{
				dataIndex: 'modUtilitiesRest',
				width: 330,
				tooltip: _('EasyPack.description.modUtilitiesRest'),
				header: _('EasyPack.modUtilitiesRest'),
				sortable: true,
				hidden: true,
				renderer: extraExt.grid.renderers.JSON,
				extraExtRenderer: {
					popup: true,
				},
				extraExtEditor: {
					xtype: extraExt.inputs.modComboSuper.xtype,
					fieldLabel: _('EasyPack.modUtilitiesRest'),
					name: 'modUtilitiesRest',
					id: 'add-' + this.ident + '-modUtilitiesRest',
					anchor: '99%',
					forceSelection: true,
					fields: ['id', 'url', 'snippet'],
					url: modUtilConnector_url,
					baseParams: {
						action: 'mgr/rest/rest/get', combo: 1, sort: 'id',
						dir: 'DESK',
					},
					allowBlank: true,
					valueField: 'url',
					displayField: 'url',
					tpl: elemTemplate5

				},
				editor: {xtype: 'textfield'},
			}
		)
	}
	var app = {
		cls: 'container', // Добавляем отступы
		items: [{
			html: ' <h2>' + _('EasyPack') + ' <small style="font-size: 10px"><a href="https://forms.gle/E9hZht9RthdcX6Ur7" target="_blank">Bug report</a></small></h2>',
		},
			{
				xtype: extraExt.tabs.xtype,
				deferredRender: false,
				border: true,
				items: [
					{
						title: _('EasyPack.Packages'),
						layout: '',
						items: [
							{
								id: 'EasyPack-main-table',
								name: _('EasyPack.Package'),
								xtype: extraExt.grid.xtype,
								extraEditor: 'EasyPack-window-add',
								columns: columns,
								fields: [
									'id',
									'name',
									'version',
									'date',
									'chunks',
									'snippets',
									'plugins',
									'templates',
									'resources',
									'menus',
									'settings',
									'core',
									'assets',
									'requires',
									'readme',
									'changelog',
									'setup_option',
									'php_resolver',
									'license',
									'tables',
									'path_to_last_transport',
									'modUtilitiesRest',
								],
								autosave: true,
								nameField: 'name',
								url: easypackConnectorUrl,
								extraExtSearch: true,
								extraExtUpdate: true,
								extraExtCreate: true,
								extraExtDelete: true,
								requestDataType: 'form',
								action: 'mgr/get',
								save_action: 'mgr/update',
								create_action: 'mgr/create',
								delete_action: 'mgr/del',
								addMenu: function(m, grid, rowIndex) {
									m.push({
										icon: '<i class="fad fa-folder-tree"></i>',
										text: _('EasyPack.create_structure'),
										grid: grid,
										rowIndex: rowIndex,
										handler: this.create
									})
									m.push({
										icon: '<i class="fad fa-cogs"></i>',
										text: _('EasyPack.build'),
										grid: grid,
										rowIndex: rowIndex,
										handler: this.build
									})
									m.push({
										icon: '<i class="fal fa-file"></i>',
										text: _('EasyPack.getResolver'),
										grid: grid,
										rowIndex: rowIndex,
										handler: this.getResolver
									})
									// m.push({
									// 	text: _('EasyPack.test'),
									// 	grid: grid,
									// 	rowIndex: rowIndex,
									// 	handler: this.test
									// })
									return m
								},
								del: function() {
									var cs = this.getSelectedAsList()
									var self = this
									MODx.msg.confirm({
										title: _('delete'),
										text: _('confirm_remove'),
										url: easypackConnectorUrl,
										params: {
											action: 'mgr/del',
											id: cs,
										},
										listeners: {
											'success': {
												fn: function(r) {
													if(!r.success) {
														MODx.msg.status({
															title: _('undeleted'),
															message: 'Ошибка',
															delay: 3
														})
													} else {
														MODx.msg.status({
															title: _('delete'),
															message: 'Готово',
															delay: 3
														})
													}
													self.refresh()
												}, scope: true
											}
										}
									})
								},
								build: function() {
									var cs = this.getSelectedAsList()
									var self = this
									MODx.msg.confirm({
										title: _('create'),
										text: _('confirm'),
										url: easypackConnectorUrl,
										params: {
											action: 'mgr/build/build',
											id: cs,
										},
										listeners: {
											'success': {
												fn: function(r) {
													if(!r.success) {
														MODx.msg.status({
															title: 'building',
															message: 'Ошибка',
															delay: 3
														})
													} else {
														console.log(r)
														MODx.msg.status({
															title: 'building',
															message: `Готово ${r.object.time}<br>
														<a href="${r.object.path}" target="_blank" >Скачать</a>
														`,
															delay: 10
														})
													}
													self.refresh()
												}, scope: true
											}
										}
									})
								},
								update: function() {
									var cs = this.getSelectedAsList()
									var self = this
									var data = this.getSelectionModel().getSelections()[0].data
									MODx.load({
										xtype: 'EasyPack-window-add',
										title: `обновить ${data.name}`,
										updateId: cs,
										updateData: data,
										action: self.save_action,
									}).show()
								},
								create: function() {
									var cs = this.getSelectedAsList()
									var self = this
									var data = this.getSelectionModel().getSelections()[0].data
									MODx.load({
										xtype: 'EasyPack-window-create',
										title: _('EasyPack.create') + ` ${data.name}`,
										updateId: cs,
										updateData: data,
									}).show()
								},
								test: function() {
									var cs = this.getSelectedAsList()
									var self = this
									var data = this.getSelectionModel().getSelections()[0].data
									MODx.msg.confirm({
										title: _('create'),
										text: _('confirm'),
										url: easypackConnectorUrl,
										params: {
											action: 'mgr/build/testPack',
											id: cs,
										},
										listeners: {
											'success': {
												fn: function(r) {
													Ext.MessageBox.show({
														title: config.title || '',
														msg: r.object.msg || '',
														width: window.innerWidth / 100 * 50,
														height: window.innerHeight / 100 * 50,
														buttons: Ext.MessageBox.CANCEL,
														icon: Ext.MessageBox.QUESTION
													})
													self.refresh()
												}, scope: true
											}
										}
									})
								},
								getResolver: function() {
									var cs = this.getSelectedAsList()
									var self = this
									var data = this.getSelectionModel().getSelections()[0].data
									MODx.msg.confirm({
										title: _('create'),
										text: _('confirm'),
										url: easypackConnectorUrl,
										params: {
											action: 'mgr/build/genresolver',
											id: cs,
										},
										listeners: {
											'success': {
												fn: function(r) {
													extraExt.util.renderer.openPopup({
														title: config.title || '',
														msg: r.message || '',
														buttons: Ext.MessageBox.CANCEL,
														icon: Ext.MessageBox.QUESTION,
														type: 'php'
													})
													self.refresh()
												}, scope: true
											}
										}
									})
								},
							}
						]
					},
					{
						title: 'Wiki',
						id: 'Wiki-tabs',
						xtype: extraExt.tabs.xtype,
						deferredRender: false,
						border: true,
						items: []

					}
				]
			}
		]
	}

	Ext.apply(config, app)
	EasyPack.panel.Home.superclass.constructor.call(this, config) // Чёртова магия =)
}
Ext.extend(EasyPack.panel.Home, MODx.Panel)
Ext.reg('EasyPack-panel-home', EasyPack.panel.Home)

//окно редактора
EasyPack.window.add = function(config) {
	config = Object.assign({
		updateData: {}
	}, config)
	config.tables = function(key) {
		try {
			if(config.updateData.tables) {
				var data = JSON.parse(config.updateData.tables)
				switch( key ) {
					case 'tables':
						return data.tables.join(',')
						break
					case 'prefix':
						return data.prefix
						break
				}
			}

		} catch(e) {

		}
		return ''
	}
	config.dependence = function() {
		if(config.updateData.tables) {
			try {
				var data = JSON.parse(config.updateData.requires)
				var extras = Object.keys(data?.extras) || []
				var res = []
				for(var i of extras) {
					var t = {}
					t['package_name'] = i
					res.push(t)
				}
				return res
			} catch(e) {

			}
			return ''
		}
	}
	var fields = [
		{
			xtype: 'hidden',
			name: 'id',
			id: 'add-' + this.ident + '-id',
			value: config.updateData.id || null,
			allowBlank: true
		},
		{
			xtype: 'textfield',
			fieldLabel: _('name'),
			name: 'name',
			id: 'add-' + this.ident + '-name',
			anchor: '99%',
			value: config.updateData.name || null,
			allowBlank: false,
		},
		{
			xtype: 'textfield',
			fieldLabel: _('version'),
			emptyText: '0.0.1-pl',
			name: 'version',
			id: 'add-' + this.ident + '-version',
			anchor: '99%',
			value: config.updateData.version || null,
			allowBlank: false
		},

		{
			xtype: extraExt.inputs.modComboSuper.xtype,
			fieldLabel: _('chunk'),
			name: 'chunks',
			id: 'add-' + this.ident + '-chunk',
			anchor: '99%',
			value: todata(config.updateData.chunks) || null,
			forceSelection: true,
			fields: ['id', 'name', 'category_name'],
			url: MODx.config.connector_url,
			baseParams: {
				action: 'element/chunk/getlist', combo: 1, sort: 'id',
				dir: 'DESK',
			},
			allowBlank: true,
			valueField: 'name',
			displayField: 'name',
			tpl: elemTemplate0
		},
		{
			xtype: extraExt.inputs.modComboSuper.xtype,
			fieldLabel: _('snippet'),
			name: 'snippets',
			id: 'add-' + this.ident + '-snippet',
			anchor: '99%',
			value: todata(config.updateData.snippets),
			forceSelection: true,
			fields: ['id', 'name', 'category_name'],
			url: MODx.config.connector_url,
			baseParams: {
				action: 'element/snippet/getlist', combo: 1, sort: 'id',
				dir: 'DESK',
			},
			allowBlank: true,
			valueField: 'name',
			displayField: 'name',
			tpl: elemTemplate0
		},
		{
			xtype: extraExt.inputs.modComboSuper.xtype,
			fieldLabel: _('plugin'),
			name: 'plugins',
			id: 'add-' + this.ident + '-plugin',
			anchor: '99%',
			value: todata(config.updateData.plugins),
			forceSelection: true,
			fields: ['id', 'name', 'category_name'],
			url: MODx.config.connector_url,
			baseParams: {
				action: 'element/plugin/getlist', combo: 1, sort: 'id',
				dir: 'DESK'
			},
			allowBlank: true,
			valueField: 'name',
			displayField: 'name',
			tpl: elemTemplate0
		},
		{
			xtype: extraExt.inputs.modComboSuper.xtype,
			fieldLabel: _('template'),
			name: 'templates',
			id: 'add-' + this.ident + '-template',
			anchor: '99%',
			value: todata(config.updateData.templates, 'templatename'),
			forceSelection: true,
			fields: ['id', 'templatename', 'category_name'],
			url: MODx.config.connector_url,
			baseParams: {
				action: 'element/template/getlist', combo: 1, sort: 'id',
				dir: 'DESK',
			},
			allowBlank: true,
			valueField: 'templatename',
			displayField: 'templatename',
			tpl: elemTemplate2
		},
		{
			xtype: extraExt.inputs.modComboSuper.xtype,
			fieldLabel: _('resources'),
			name: 'resources',
			id: 'add-' + this.ident + '-resources',
			anchor: '99%',
			value: todata(config.updateData.resources, 'id'),
			forceSelection: true,
			fields: ['id', 'pagetitle', 'uri'],
			url: MODx.config.connector_url,
			baseParams: {
				action: 'resource/getlist', combo: 1, sort: 'id',
				dir: 'DESK',
			},
			allowBlank: true,
			valueField: 'id',
			displayField: 'id',
			tpl: elemTemplate6
		},
		{
			xtype: extraExt.inputs.modComboSuper.xtype,
			fieldLabel: _('edit_menu'),
			name: 'menus',
			id: 'add-' + this.ident + '-menu',
			anchor: '99%',
			value: todata(config.updateData.menus, 'text'),
			forceSelection: true,
			fields: ['text', 'text_lex', 'parent', 'namespace'],
			url: MODx.config.connector_url,
			baseParams: {
				action: 'system/menu/getlist', combo: 1, sort: 'namespace',
				dir: 'DESK',
			},
			allowBlank: true,
			valueField: 'text',
			displayField: 'text',
			tpl: elemTemplate3
		},
		{
			xtype: extraExt.inputs.modComboSuper.xtype,
			fieldLabel: _('settings'),
			name: 'settings',
			id: 'add-' + this.ident + '-setting',
			anchor: '99%',
			value: todata(config.updateData.settings, 'key'),
			forceSelection: true,
			fields: ['key', 'name_trans', 'namespace'],
			url: MODx.config.connector_url,
			baseParams: {
				action: 'system/settings/getlist', combo: 1, sort: 'namespace',
				dir: 'DESK',
			},
			allowBlank: true,
			valueField: 'key',
			displayField: 'key',
			tpl: elemTemplate4
		},
		{
			xtype: extraExt.inputs.popup.xtype,
			fields: [
				{
					xtype: extraExt.inputs.modComboSuper.xtype,
					fieldLabel: _('EasyPack.tables'),
					forceSelection: true,
					fields: ['key'],
					name: 'tables',
					url: easypackConnectorUrl,
					baseParams: {
						action: 'show/gettables', combo: 1,
					},
					allowBlank: true,
					valueField: 'key',
					displayField: 'key',
					listeners: ToolTip,
				},
				{
					xtype: 'textfield',
					fieldLabel: _('EasyPack.prefix'),
					name: 'prefix',
					id: 'add-' + this.ident + '-prefix',
					anchor: '99%',
					allowBlank: true,
					rootVisible: true,
					listeners: ToolTip,
				},
			],
			fieldLabel: _('EasyPack.tables'),
			anchor: '99%',
			id: 'add-' + this.ident + '-tables',
			value: config.updateData.tables || JSON.stringify({'prefix': modx_prefix}),
			name: 'tables',
		},
		// {
		// 	xtype: 'textarea',
		// 	toolTip: 'имена таблиц через запятую (с префиксом)',
		// 	fieldLabel: _('EasyPack.tables'),
		// 	name: 'tables',
		// 	id: 'add-' + this.ident + '-tables',
		// 	anchor: '99%',
		// 	value: config.tables('tables') || null,
		// 	allowBlank: true,
		// 	rootVisible: true,
		// 	listeners: ToolTip,
		//
		// },
		// {
		// 	xtype: 'textfield',
		// 	fieldLabel: _('EasyPack.prefix'),
		// 	name: 'prefix',
		// 	id: 'add-' + this.ident + '-prefix',
		// 	anchor: '99%',
		// 	value: config.tables('prefix') || modx_prefix,
		// 	allowBlank: true,
		// 	rootVisible: true,
		// 	listeners: ToolTip,
		// },
		{
			xtype: extraExt.browser.xtype,
			canSelectFolder: false,
			fieldLabel: _('EasyPack.core'),
			toolTip: _('EasyPack.description.core'),
			listeners: ToolTip,
			name: 'core',
			id: 'add-' + this.ident + '-core',
			anchor: '99%',
			value: config.updateData['core'] || null,
			allowBlank: true,
			rootVisible: true,
			source: MODx.config.default_media_source,
			openTo: '/core/components',
		},
		{
			xtype: extraExt.browser.xtype,
			canSelectFolder: false,
			fieldLabel: _('EasyPack.assets'),
			toolTip: _('EasyPack.description.assets'),
			listeners: ToolTip,
			name: 'assets',
			id: 'add-' + this.ident + '-assets',
			anchor: '99%',
			value: config.updateData['assets'] || null,
			allowBlank: true,
			rootVisible: true,
			source: MODx.config.default_media_source,
			openTo: '/core/components',
		},
		{
			xtype: 'textarea',
			name: 'requires',
			fieldLabel: _('EasyPack.requires'),
			tooltip: _('EasyPack.description.requires'),
			id: 'add-' + this.ident + '-requires',
			anchor: '99%',
			value: config.updateData['requires'] || null,
			allowBlank: true,
			rootVisible: true,
		},
		{
			xtype: extraExt.inputs.modComboSuper.xtype,
			name: 'dependence',
			fieldLabel: _('EasyPack.dependence'),
			tooltip: _('EasyPack.description.dependence'),
			id: 'add-' + this.ident + '-dependence',
			anchor: '99%',
			url: MODx.config.connector_url,
			baseParams: {
				action: 'workspace/packages/getlist', combo: 1, sort: 'package_name',
				dir: 'DESK',
			},
			value: config.dependence() || null,
			forceSelection: true,
			fields: ['package_name'],
			allowBlank: true,
			valueField: 'package_name',
			displayField: 'package_name',

		},

		{
			xtype: extraExt.browser.xtype,
			canSelectFolder: false,
			name: 'readme',
			tooltip: _('EasyPack.description.readme'),
			fieldLabel: _('EasyPack.readme'),
			id: 'add-' + this.ident + '-readme',
			anchor: '99%',
			value: config.updateData['readme'] || null,
			allowBlank: true,
			rootVisible: true,
			source: MODx.config.default_media_source,
			openTo: '/core/components'
		},
		{
			xtype: extraExt.browser.xtype,
			canSelectFolder: false,
			name: 'changelog',
			tooltip: _('EasyPack.description.changelog'),
			fieldLabel: _('EasyPack.changelog'),
			id: 'add-' + this.ident + '-changelog',
			anchor: '99%',
			value: config.updateData['changelog'] || null,
			allowBlank: true,
			rootVisible: true,
			source: MODx.config.default_media_source,
			openTo: '/core/components'
		},
		{
			xtype: extraExt.browser.xtype,
			canSelectFolder: false,
			fieldLabel: _('EasyPack.setup_option'),
			tooltip: _('EasyPack.description.setup_option'),
			listeners: ToolTip,
			name: 'setup_option',
			id: 'add-' + this.ident + '-setup_option',
			anchor: '99%',
			value: config.updateData['setup_option'] || null,
			allowBlank: true,
			rootVisible: true,
			allowedFileTypes: 'php',
			source: MODx.config.default_media_source,
			openTo: '/core/components'
		},
		{
			xtype: extraExt.browser.xtype,
			canSelectFolder: false,
			tooltip: _('EasyPack.description.php_resolver'),
			fieldLabel: _('EasyPack.php_resolver'),
			listeners: ToolTip,
			name: 'php_resolver',
			id: 'add-' + this.ident + '-php_resolver',
			anchor: '99%',
			value: config.updateData['php_resolver'] || null,
			allowBlank: true,
			rootVisible: true,
			allowedFileTypes: 'php',
			source: MODx.config.default_media_source,
			openTo: 'core/components/'

		},
		{

			xtype: extraExt.browser.xtype,
			canSelectFolder: false,
			tooltip: _('EasyPack.description.license'),
			fieldLabel: _('EasyPack.license'),
			listeners: ToolTip,
			name: 'license',
			id: 'add-' + this.ident + '-license',
			anchor: '99%',
			value: config.updateData['license'] || null,
			allowBlank: true,
			rootVisible: true,
			source: MODx.config.default_media_source,
			openTo: '/core/components'
		},
	]
	if(modUtil) {
		fields.push(
			{
				xtype: extraExt.inputs.modComboSuper.xtype,
				fieldLabel: _('EasyPack.modUtilitiesRest'),
				name: 'modUtilitiesRest',
				id: 'add-' + this.ident + '-modUtilitiesRest',
				anchor: '99%',
				value: todata(config.updateData.modUtilitiesRest, 'url'),
				forceSelection: true,
				fields: ['id', 'url', 'snippet'],
				url: modUtilConnector_url,
				baseParams: {
					action: 'mgr/rest/rest/get', combo: 1, sort: 'id',
					dir: 'DESK',
				},
				allowBlank: true,
				valueField: 'url',
				displayField: 'url',
				tpl: elemTemplate5
			},
		)
	}
	config.fields = fields
	EasyPack.window.add.superclass.constructor.call(this, config) // Магия
}
Ext.extend(EasyPack.window.add, extraExt.xTypes[extraExt.grid.editor.xtype]) // Расширяем MODX.Window
Ext.reg('EasyPack-window-add', EasyPack.window.add) // Регистрируем новый xtype
//добавление категории

//окно редактора2
EasyPack.window.create = function(config) {
	config.updateData = Object.assign({
		'name': '',
	}, config.updateData)
	config.updateData.name_lower = config.updateData.name.toLowerCase()
	this.ident = config.ident || 'EasyPack' + Ext.id()
	this.saveBtnText = _('EasyPack.create'),
		this.title = _('EasyPack.create_structure') + ' - ' + config.updateData.name
	var self = this
	var fields = [
		{
			xtype: 'hidden',
			name: 'id',
			value: config.updateData.id || null,
			allowBlank: true
		},
		{
			xtype: 'xcheckbox',
			name: 'create__js_mgr_',
			id: 'add-' + this.ident + '-create__js_mgr_',
			boxLabel: _('_js_mgr_', {name: config.updateData.name_lower}),
			originalValue: true,

		},
		{
			xtype: 'xcheckbox',
			name: 'create__controllers_mgr_',
			id: 'add-' + this.ident + '-create__controllers_mgr_',
			boxLabel: _('_controllers_mgr_', {name: config.updateData.name_lower}),
			originalValue: true,

		},
		{
			xtype: 'xcheckbox',
			name: 'create__docs_',
			id: 'add-' + this.ident + '-create__docs_',
			boxLabel: _('_docs_', {name: config.updateData.name_lower}),
			originalValue: true,

		},
		{
			xtype: 'xcheckbox',
			name: 'create__elements_chunks_',
			id: 'add-' + this.ident + '-create__elements_chunks_',
			boxLabel: _('_elements_chunks_', {name: config.updateData.name_lower}),
			originalValue: true,

		},
		{
			xtype: 'xcheckbox',
			name: 'create__elements_plugins_',
			id: 'add-' + this.ident + '-create__elements_plugins_',
			boxLabel: _('_elements_plugins_', {name: config.updateData.name_lower}),
			originalValue: true,

		},
		{
			xtype: 'xcheckbox',
			name: 'create__elements_snippets_',
			id: 'add-' + this.ident + '-create__elements_snippets_',
			boxLabel: _('_elements_snippets_', {name: config.updateData.name_lower}),
			originalValue: true,

		},
		{
			xtype: 'xcheckbox',
			name: 'create__elements_templates_',
			id: 'add-' + this.ident + '-create__elements_templates_',
			boxLabel: _('_elements_templates_', {name: config.updateData.name_lower}),
			originalValue: true,

		},
		{
			xtype: 'xcheckbox',
			name: 'create__lexicon_en_',
			id: 'add-' + this.ident + '-create__lexicon_en_',
			boxLabel: _('_lexicon_en_', {name: config.updateData.name_lower}),
			originalValue: true,

		},
		{
			xtype: 'xcheckbox',
			name: 'create__processors_',
			id: 'add-' + this.ident + '-create__processors_',
			boxLabel: _('_processors_', {name: config.updateData.name_lower}),
			originalValue: true,

		},
		{
			xtype: 'xcheckbox',
			name: 'create__model_',
			id: 'add-' + this.ident + '-create__model_',
			boxLabel: _('_model_', {name: config.updateData.name_lower}),
			originalValue: true,

		},
		{
			xtype: 'xcheckbox',
			name: 'create__namespace_',
			id: 'add-' + this.ident + '-create__namespace_',
			boxLabel: _('_namespace_', {name: config.updateData.name_lower}),
			originalValue: true,
		},
		{
			xtype: 'xcheckbox',
			name: 'create__elements_',
			id: 'add-' + this.ident + '-create__elements_',
			boxLabel: _('_elements_', {name: config.updateData.name_lower}),
			originalValue: true,
		},
		{
			xtype: 'xcheckbox',
			name: 'import_from_category',
			id: 'add-' + this.ident + '-import_from_category',
			boxLabel: _('import_from_category', {name: config.updateData.name_lower}),
			originalValue: true,
		},
		{
			xtype: 'xcheckbox',
			name: 'add_dependence_extraExt',
			isOptional: true,
			id: 'add-' + this.ident + '-add_dependence_extraExt',
			boxLabel: _('add_dependence_extraExt'),
			originalValue: true,
		}
	]
	if(modUtil) {
		fields.push({
			xtype: 'xcheckbox',
			name: 'add_dependence_modutil',
			isOptional: true,
			id: 'add-' + this.ident + '-add_dependence_modutil',
			boxLabel: _('add_dependence_modutil'),
			originalValue: true,
		})
	}
	Ext.applyIf(config, {
		id: 'EasyPack-window-' + this.ident + '-create',
		fields: fields,
		saveBtnText: _('EasyPack.create') + ' 🗂',
		action: 'mgr/build/create',
		url: easypackConnectorUrl,
		bbar: [
			{
				text: _('EasyPack.Select_All'),
				handler: function(e) {
					var f = Ext.getCmp('EasyPack-window-' + self.ident + '-create').fields
					for(x of f) {
						if(x.id && x?.isOptional !== true) {
							Ext.getCmp(x.id).setValue(true)
						}
					}
				}
			},
			{
				text: _('EasyPack.Deselect_All'),
				handler: function(e) {
					var f = Ext.getCmp('EasyPack-window-' + self.ident + '-create').fields
					for(x of f) {
						if(x.id) {
							Ext.getCmp(x.id).setValue(false)
						}
					}
				}
			}
		],
		listeners: {
			success: function() {
				MODx.msg.status({
					title: _('created'),
					message: 'Готово',
					delay: 3
				})
				Ext.getCmp('EasyPack-main-table').refresh()
				this.remove()
			},
			failure: function() {
				this.remove()
			}
		},
	})
	EasyPack.window.create.superclass.constructor.call(this, config) // Магия
}
Ext.extend(EasyPack.window.create, extraExt.xTypes[extraExt.window.xtype]) // Расширяем MODX.Window
Ext.reg('EasyPack-window-create', EasyPack.window.create) // Регистрируем новый xtype
//добавление категории