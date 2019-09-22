Vue.component("float-bot", {
  template:
    '<div class="bottom_float navbar-fixed-bottom">\n' +
    '    <div class="container">\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-4 text-center col-xs-12">\n' +
    "                <i></i>\n" +
    "                <h5>\n" +
    "                    &nbsp;加盟热线：400-8697-698\n" +
    "                </h5>\n" +
    '                <a href="contact_us.html" class="bottom_float_hidden pull-right">\n' +
    "                <h5>立即预约</h5>\n" +
    "                </a>\n" +
    '                <i class="pull-right"></i>\n' +
    "            </div>\n" +
    '            <div class="col-md-8 hidden-xs">\n' +
    '            <form class="form-inline" id="navbar-fixed-bottom-form">\n' +
    '            <div class="form-group col-lg-5 index_md-3 align-self-center">\n' +
    '                <label for="bottom_float_name" class="pr-2">\n' +
    "                    姓名&nbsp;:&nbsp;&nbsp;\n" +
    "                </label>\n" +
    '                <input type="text" class="form-control" id="bottom_float_name" placeholder="您的姓名" />\n' +
    "            </div>\n" +
    '            <div class="form-group col-lg-5 index_md-3 align-self-center">\n' +
    '                <label for="bottom_float_phone" class="pr-2">手机&nbsp;:&nbsp;&nbsp;</label>\n' +
    '                <input type="text" class="form-control" id="bottom_float_phone" placeholder="您的手机号" />\n' +
    "            </div>\n" +
    '            <div class="col-lg-2 index_md-6 align-self-center">\n' +
    '                <button type="button" onclick="submitPhone()" class="btn btn-warning" >\n' +
    "                    在线预约\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    </div>"
});
Vue.component("footer-copy", {
  template:
    "<footer>\n" +
    '      <div class="container foot_link">\n' +
    '          <div class="row foot_link_top">\n' +
    '              <div class="col-md-12 text-center">\n' +
    '                  <i><img src="img/logo.png" alt="" /></i>\n' +
    "              </div>\n" +
    "          </div>\n" +
    '          <div class="row foot_link_copyRight">\n' +
    '              <div class="col-md-12 text-center">\n' +
    "                  <span>公司地址： 安徽省合肥市庐阳区寿春路156号古井百花大厦B座</span>\n" +
    "                  <span>安徽尚京品牌管理股份有限公司版权所有 皖ICP备18022821号-2</span>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </footer>"
});
new Vue({
  el: "#footer-zf"
});
