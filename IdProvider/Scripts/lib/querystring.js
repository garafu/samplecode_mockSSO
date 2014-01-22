var query = (function () {
    var queryString, queryItems, queryItem,
        i, length, matchs, key, pkey, skey, value, list, hash, params = {};

    // クエリストリングの取得
    queryString = window.location.search || '';
    queryString = queryString.substr(1, queryString.length);

    // パラメター毎に分解
    queryItems = queryString.split('&');

    // 各パラメターをキー&バリューに分解
    for (i = 0, length = queryItems.length; i < length; i++) {
        // 1組取り出し
        queryItem = (queryItems[i] || '').split('=');

        // キー&バリューに分解
        key = queryItem[0];
        value = queryItem[1] ? window.decodeURIComponent(queryItem[1]) : undefined;

        // キー文字列によってオブジェクトの作り方を変える
        matchs = (/([\w$]*)\[([\w$]*)\]/g).exec(key);
        if (matchs === null) {
            // 単純なキー&バリュー
            params[key] = value;
        } else {
            pkey = matchs[1];
            skey = matchs[2];
            if (!skey) {
                // 配列にバリューを格納
                list = params[pkey] = params[pkey] || [];
                list[list.length] = value;
            } else {
                // ハッシュにサブキーとバリューを格納
                hash = params[pkey] = params[pkey] || {};
                hash[skey] = value;
            }
        }
    }

    return params;
})();