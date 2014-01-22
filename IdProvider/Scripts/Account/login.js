/// <reference path="~/Scripts/lib/jquery-1.10.2.js" />
/*global query*/


/**
* Ajax 通信が成功した際に呼び出されます。
* @param    {object}    data        dataType に従って変換されたオブジェクト
* @param    {string}    textStatus  ステータス文字列
* @param    {jqXHR}     jqXHR       XmlHttpRequest のラッパーオブジェクト
*/
var ajax_onsuccess = function (data, textStatus, jqXHR) {
    if (data.isSuccess) {
        window.location = query.ReturnUrl || '/';
    } else {
        $('input').removeAttr('disabled');
    }
};


/**
* Ajax 通信が失敗した際に呼び出されます。
* @param    {jqXHR}     jqXHR       XmlHttpRequest のラッパーオブジェクト
* @param    {string}    textStatus  ステータス文字列
* @param    {string}    data        HTTPステータスの一部
*/
var ajax_onerror = function (jqXHR, textStatus, errorThrown) {
    $('input').removeAttr('disabled');
};


/**
* submit ボタン 押下時に呼び出されます。
* @param    {jQuery.Event}  event   jQuery イベントオブジェクト
*/
var submitbutton_onclick = function (event) {
    // リクエスト用のデータを準備
    var data = {
        id: $('#id').val(),
        password: $('#password').val(),
        rememberMe: $('#rememberMe').prop('checked')
    };

    // ログイン リクエスト
    $.ajax({
        type: 'POST',
        url: '/api/authentication/signin',
        data: data,
        success: ajax_onsuccess,
        error: ajax_onerror
    });

    // input要素 を 無効化（非活性）
    $('input').attr('disabled', 'disabled');
};


/**
* ドキュメントが読み込み終わった時、呼び出されます。
*/
var document_onready = function () {
    $('#submit').on('click', submitbutton_onclick);
};


$(document).ready(document_onready);
