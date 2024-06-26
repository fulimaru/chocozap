document.getElementById('workoutForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // メッセージエリアをクリア
  document.getElementById('response').innerText = '';
  
  var date = document.getElementById('date').value;
  var weight = document.getElementById('weight').value;
  var reps = document.getElementById('reps').value;
  var type = document.querySelector('input[name="type"]:checked').value;
  
  var formData = new FormData();
  formData.append('date', date);
  formData.append('weight', weight);
  formData.append('reps', reps);
  formData.append('type', type);
  
  async function sendData(formData) {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbx8ZKz2UNzL7jdf8MBug9h6siiLPcOc2dfLQbX5sUU8fz3DMfvIxWMb0rPmGSlCYUeo/exec', {
        method: 'POST',
        mode: 'no-cors', // CORSポリシーによる制限を回避
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // データ形式を指定
        },
        body: formData
      });
  
      const data = await response.json();
  
      if (data.result === "success") {
        document.getElementById('response').innerText = "データが正常に送信されました。";
      } else {
        document.getElementById('response').innerText = "エラーが発生しました: " + data.message;
      }
    } catch (error) {
      document.getElementById('response').innerText = 'エラーが発生しました: ' + error.message;
    }
  }

  // sendData関数を呼び出してフォームデータを送信
  sendData(formData);

  /*
  fetch('https://script.google.com/macros/s/AKfycbzWg4Hfxg6XGscQOoOqWJ4MD0emEQ6mSXiQgi_4dKRQJx7NZ9REDbhn7yE9ho5excsf/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === "success") {
      document.getElementById('response').innerText = "データが正常に送信されました。";
    } else {
      document.getElementById('response').innerText = "エラーが発生しました: " + data.message;
    }
  })
  .catch(error => {
    document.getElementById('response').innerText = 'エラーが発生しました: ' + error.message;
  });
  */
});
