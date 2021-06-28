<template>

		<div class="root">
			<div class="root-operation">
				<div class="button-style"><a class="new-button default h-28">分享</a></div>
				<a class="button-style new-button default h-28" href="/p/jybgcw/wiki/331/edit">编辑文档</a>
			</div>
			<div class="scroll-content">
				<div class="content">
					<div class="wiki">
						<div class="wiki-content">
							<div class="crumbs mg-top-max"></div>
							<h1 class="wiki-title">亿己网前期版本需求文档</h1>
							<div class="wiki-info">
								<img
									class="wiki-image"
									src="https://coding-net-production-static-ci.codehub.cn/WM-TEXT-AVATAR-RmieYSoPiOQlefaWzDDg.jpg"
									alt="sdasd"
								/><span class="updater-p" title="张浩">张浩</span>更新于&nbsp;<span>2020 年 08 月 05 日</span><span class="dot">·</span
								><span class="creator" title="张浩">张浩</span>创建于&nbsp;<span>2020 年 08 月 05 日</span><span class="dot">·</span>ID #331
							</div>
							<div class="graph-markdown-36pAhy8Y-m">
								<div class="cuk-markdown">
									<h1 id="user-content-亿己网需求文档">亿己网需求文档</h1>
									<h2 id="user-content-1亿己网简介">1、亿己网简介</h2>
									<p>
										亿己网是辽宁甲乙丙工程咨询有限公司针对图纸设计行业推出的项目协同管理工具，系统具有项目管理、文件管理、知识库、每日任务、设计绩效等功能，通过项目管理实现设计全流程管控；系统实现了图纸储存机制，通过分布式文件管理系统，将图纸集中管理，为公司提供更安全、更高效的图纸管理；系统通过项目分析出待设计任务、设计中任务、已完成任务，提供所有任务的条目，从而实现任务清晰化、流程化、智能化，使设计效率更高效；
									</p>
									<h2 id="user-content-2亿己网版本">2、亿己网版本</h2>
									<div class="markdown-table">
										<table>
											<tbody>
												<tr>
													<th>产品版本</th>
													<th>修订日期</th>
													<th>修订人</th>
												</tr>
											</tbody>
											<tbody>
												<tr>
													<td>1.2</td>
													<td>2020.07.23</td>
													<td>张浩</td>
												</tr>
												<tr>
													<td>&nbsp;</td>
													<td>&nbsp;</td>
													<td>&nbsp;</td>
												</tr>
												<tr>
													<td>&nbsp;</td>
													<td>&nbsp;</td>
													<td>&nbsp;</td>
												</tr>
											</tbody>
										</table>
									</div>
									<h2 id="user-content-3亿己网功能结构图">3、亿己网功能结构图</h2>
									<p>
										<a href="about:invalid#zGuavaz" target="_blank" class="bubble-markdown-image-link"
											><img
												alt="image-20200723155747841"
												class="bubble-markdown-image"
												origin-src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200723155747841.png"
										/></a>
									</p>
									<h2 id="user-content-4亿己网模块">4、亿己网模块</h2>
									<ul>
										<li>
											<h3 id="user-content-登录模块">登录模块</h3>
											<ol>
												<li>
													<p><strong>登录具体描述</strong></p>
													<ol>
														<li>
															用户选择打开软件，直接弹出登录页面——可使用人员代码+密码登录，提交表单前需验证表单是否为空，表单提交后，需验证人员代码在用户表中是否存在，如不存在给出提示，如存在判断密码是否一致，如一致登录成功，将用户信息加密存储到电脑本地文件中并拉取用户菜单列表。
														</li>
													</ol>
												</li>
											</ol>
										</li>
										<li>
											<h3 id="user-content-系统设置模块">系统设置模块</h3>
											<ol>
												<li>
													<p><strong>用户中心</strong></p>
													<ul>
														<li>
															<p>部门管理</p>
															<ul>
																<li>
																	<p>新增部门</p>
																	<ul>
																		<li>
																			<p>
																				新增部门，人员只能新增自己部门的子部门，系统根据规则生成部门编码，选择部门经理，部门状态，部门显示排序，最大设计面积，最大承接项目数量，必选择父级部门，进行表单提交新增，；
																			</p>
																			<p><span>*只有admin可新增顶级部门，顶级部门不限制最大设计面积，最大承接项目数量。</span></p>
																		</li>
																	</ul>
																</li>
																<li>
																	<p>删除部门</p>
																	<ul>
																		<li>顶级部门如无自己部门可删除，子级部门如无人员以及没有设计过项目可删除，子级部门如无设计中的项目可停用；</li>
																	</ul>
																</li>
																<li>
																	<p>修改部门</p>
																	<ul>
																		<li>修改部门如无进行中的项目可修改部门最大设计面积，最大项目承接数量，部门经理以及父级部门；</li>
																	</ul>
																</li>
																<li>
																	<p>查询部门</p>
																	<ul>
																		<li>
																			可按照部门名称，部门状态模糊搜索显示列表，列表按照分页显示部门编码，部门名称，部门状态，创建时间，操作列等
																		</li>
																	</ul>
																</li>
															</ul>
														</li>
														<li>
															<p>人员管理</p>
															<ul>
																<li>
																	新增人员
																	<ul>
																		<li>
																			新增人员，必填写用户代码，所属部门，手机号码，用户名称，用户密码，用户邮箱，用户头像，岗位，角色，状态，是否兼职以及绩效方案，进行新增，<span
																				>用户代码唯一；</span
																			>
																		</li>
																	</ul>
																</li>
																<li>
																	修改人员
																	<ul>
																		<li>
																			修改人员，可修改人员名称，手机号码，所属部门，用户头像，角色，岗位，状态，是否兼职以及绩效方案，进行修改，用户代码不可修改
																		</li>
																	</ul>
																</li>
																<li>
																	删除人员
																	<ul>
																		<li>人员不可删除，可以停用</li>
																	</ul>
																</li>
																<li>
																	查询人员
																	<ul>
																		<li>
																			按照部门树形结构图，显示人员，默认显示本部门所有人员，点击某个部门显示部门下人员，可按照人员代码，手机号码模糊搜索查询列表，列表按照分页显示用户代码、用户名称、手机号码、状态、创建时间、操作列等
																		</li>
																	</ul>
																</li>
																<li>
																	重置密码
																	<ul>
																		<li>选择人员进行重置，输入新密码进行充值；</li>
																	</ul>
																</li>
															</ul>
														</li>
														<li>
															<p>岗位管理</p>
															<ul>
																<li>
																	新增岗位
																	<ul>
																		<li>新增岗位，填写岗位名称，岗位顺序，岗位状态进行新增岗位</li>
																	</ul>
																</li>
																<li>
																	修改岗位
																	<ul>
																		<li>修改岗位，可修改岗位名称，岗位顺序，岗位状态进行岗位修改</li>
																	</ul>
																</li>
																<li>
																	删除岗位
																	<ul>
																		<li>删除岗位，如岗位没有在使用，可删除，否则不可删除</li>
																	</ul>
																</li>
																<li>
																	查询岗位
																	<ul>
																		<li>
																			可按照岗位名称，岗位状态模糊搜索显示列表，列表按照分页显示岗位编号，岗位名称，岗位顺序，岗位状态，创建时间，操作列等
																		</li>
																	</ul>
																</li>
															</ul>
														</li>
														<li>
															<p>角色管理</p>
															<ul>
																<li>
																	新增角色
																	<ul>
																		<li>新增角色，填写角色名称，角色编码，备注信息进行新增角色，</li>
																	</ul>
																</li>
																<li>
																	修改角色
																	<ul>
																		<li>修改角色，可修改角色名称，备注信息</li>
																	</ul>
																</li>
																<li>
																	删除角色
																	<ul>
																		<li>删除角色，没有在使用中的角色可删除</li>
																	</ul>
																</li>
																<li>
																	查询角色
																	<ul>
																		<li>可按照角色名称，角色编码模糊搜索角色列表，列表按照分页显示角色编码，角色名称，创建时间，操作列等</li>
																	</ul>
																</li>
																<li>
																	授权角色
																	<ul>
																		<li>按照菜单树形显示所有菜单项，进行勾选菜单进行授权；</li>
																	</ul>
																</li>
															</ul>
														</li>
														<li>
															<p>菜单管理</p>
															<ul>
																<li>
																	<p>新增菜单</p>
																	<ul>
																		<li>
																			<p>新增菜单，选择上级菜单，菜单类型（目录，菜单，按钮），</p>
																			<ul>
																				<li><p>选择目录，填写图标，菜单名称，菜单排序，路由地址、菜单状态</p></li>
																				<li><p>选择菜单，填写图标，菜单名称，菜单排序，路由地址、组件路径、权限标识</p></li>
																				<li>
																					<p>选择按钮，填写菜单名称，菜单排序，权限标识进行</p>
																					<p>进行新增</p>
																				</li>
																			</ul>
																		</li>
																	</ul>
																</li>
																<li>
																	<p>修改菜单</p>
																	<ul>
																		<li>可修改菜单名称，图标，菜单排序，路由地址等信息进行修改</li>
																	</ul>
																</li>
																<li>
																	<p>删除菜单</p>
																	<ul>
																		<li>菜单有子级的情况下不允许删除</li>
																	</ul>
																</li>
																<li>
																	<p>查询菜单</p>
																	<ul>
																		<li>列表按照分页显示菜单名称、图标、排序、权限标识、组件路径、状态、创建时间，操作列等按照树形显示列表</li>
																	</ul>
																</li>
															</ul>
														</li>
													</ul>
												</li>
											</ol>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="outline-view-wrapper">
							<div class="outline-view" style="margin-top: 118px; height: auto">
								<div class="outline-view-root">
									<div class="outline-title">文章大纲</div>
									<ul>
										<li>
											<p><a class="" href="#user-content-亿己网需求文档">亿己网需求文档</a></p>
											<ul>
												<li><a class="" href="#user-content-1亿己网简介">1、亿己网简介</a></li>
												<li><a class="" href="#user-content-2亿己网版本">2、亿己网版本</a></li>
												<li><a class="" href="#user-content-3亿己网功能结构图">3、亿己网功能结构图</a></li>
												<li><a class="" href="#user-content-4亿己网模块">4、亿己网模块</a></li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'wiki_viewer',
});
</script>

