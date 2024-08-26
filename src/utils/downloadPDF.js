var pdfUrl = '다운받을 URL'
 
function downloadPDF() {
    fetch(pdfUrl)
      .then(response => {
      
      	// 응답이 비정상적일때
        if (!response.ok) {
          throw new Error('파일이 존재하지 않습니다.');
        }
        
        // then blob 으로 return
        return response.blob();
      })
      
      .then(blob => {
      	// url 객체 생성
        const url = window.URL.createObjectURL(blob);
        
        // 원하는 이름설정
        const pdfFileName = '테스트.pdf';
        
        // a 태그 생성
        const a = document.createElement('a');
        
        // url 맵핑
        a.href = url;
        
        // 파일명 맵핑
        a.download = pdfFileName;
        
        // a 태그 body 에 추가 -> 클릭 -> 삭제
        document.body.appendChild(a);
        a.click();
        a.remove();
        
        // URL 닫기
        window.URL.revokeObjectURL(url);
      })
      
      // 오류 메시지
      .catch(error => {
        alert(error.message);
      });
  }