document.addEventListener("DOMContentLoaded",function(){
    let studentData=[];
   
    fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
    .then(response => response.json())
    .then(data => {
        studentData = data; // Store the student data in the array
        displayStudents(studentData); // Display all students by default
    })
    .catch(error => console.error('Error fetching data:', error));

    function addStudent(students){
        const tablebody= document.getElementById("student-body");
        tablebody.innerHTML= ''; 

        students.forEach(student => {
            const row= document.createElement("tr");
            row.innerHTML=`
            <td>${student.id}</td>
            <td>${student.first_name} ${student.last_name}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.email}</td>
            `;
            tablebody.appendChild(row);
        });
    }

    //sort functionality
    function sortStudentsByFullName(order){
        studentData.sort((a,b)=>{
            const fullNameA= `${a.first_name} ${a.last_name}`;
            const fullNameB= `${b.first_name} ${b.last_name}`;
            return order === 'asc' ? fullNameA.localeCompare(fullNameB) : 
            fullNameB.localeCompare(fullNameA);
        });
        addStudent(studentData);
    }

    function sortStudentsByMarks(){
        studentData.sort((a,b)=>a.marks-b.marks);
        addStudent(studentData);
    }

    function sortStudentsByPassing(){
        const passingStudent= studentData.filter(student => student.passing);
        addStudent(passingStudent);
    }
    function sortStudentsByClass(){
        studentData.sort((a,b)=>a.class-b.class);
        addStudent(studentData);
    }
    function sortStudentsByGender() {
        // Separate male and female students
        const maleStudents = studentData.filter(student => student.gender.toLowerCase() === 'male');
        const femaleStudents = studentData.filter(student => student.gender.toLowerCase() === 'female');
        
        // Display both tables (male and female) one below the other
        const combinedStudents = [...maleStudents, ...femaleStudents];
        addStudent(combinedStudents);
    }

    // Event listeners for sorting buttons
    document.getElementById('sort-az').addEventListener('click', () => sortStudentsByFullName('asc'));
    document.getElementById('sort-za').addEventListener('click', () => sortStudentsByFullName('desc'));
    document.getElementById('sort-marks').addEventListener('click', sortStudentsByMarks);
    document.getElementById('sort-passing').addEventListener('click', sortStudentsByPassing);
    document.getElementById('sort-class').addEventListener('click', sortStudentsByClass);
    document.getElementById('sort-gender').addEventListener('click', sortStudentsByGender);

    // Search functionality
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredStudents = studentData.filter(student =>
            student.first_name.toLowerCase().includes(searchTerm) ||
            student.last_name.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm)
        );
        addStudent(filteredStudents);
    });

});



