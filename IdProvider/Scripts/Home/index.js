/// <reference path="~/Scripts/lib/jquery-1.10.2.js" />

/**
* Ajax 通信が成功した際に呼び出されます。
* @param    {object}    data        dataType に従って変換されたオブジェクト
* @param    {string}    textStatus  ステータス文字列
* @param    {jqXHR}     jqXHR       XmlHttpRequest のラッパーオブジェクト
*/
var ajax_onsuccess = function (data, textStatus, jqXHR) {
    // 画面のリロード
    window.location.reload();
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
    $.ajax({
        type: 'POST',
        url: '/api/authentication/signout',
        success: ajax_onsuccess,
        error: ajax_onerror
    });

    $('input').attr('disabled', 'disabled');
};


/**
* ドキュメントが読み込み終わった時、呼び出されます。
*/
var document_onready = function () {
    $('#logout').on('click', submitbutton_onclick);
};


$(document).ready(document_onready);
