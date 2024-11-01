
const items = [];
let num = 1;
let current_charges = 0;
let remind=0;
let current_appliance=0;
let i=0
const itemTableBody = document.getElementById('table').getElementsByTagName('tbody')[0];
const submit_button=document.getElementById('submit');
const add_button=document.getElementById('add')
submit_button.addEventListener('click',function(){
    guidance_text.style.display = 'inline';
    add.style.display = 'inline-block';
    submit_button.disabled = !isValid;
});
add_button.addEventListener('click', function() {
    guidance_text.style.display = 'none';
    add_button.style.display = 'none';
});
const form = document.getElementById('required_data');
function checkFormValidity() {
    // ตรวจสอบว่าแบบฟอร์มกรอกทุกค่า
    const isValid = form.checkValidity();
    submit_button.disabled = !isValid;
}
form.addEventListener('input', checkFormValidity);

checkFormValidity();

function showSEERinput(){
    var selectType = document.getElementById("watt_BTU");
    var SEER_show = document.getElementById("SEER_input");
    if (selectType.value === "BTU"){ //เมื่อกดปุ่ม btu จะแสดงค่า SEER ให้กรอก
        SEER_show.style.display = "block";
        SEER.required = true;
    } else {
        SEER_show.style.display = "none";
        SEER.required = false;
    }
    checkFormValidity();
}

function calculate() {
    const name_electrical = document.getElementById('name_electrical').value;
    const power = parseFloat(document.getElementById('power').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const unit_rate = parseFloat(document.getElementById('unit_rate').value);
    const watt_BTU = document.getElementById('watt_BTU').value;

    let powerInWatts = power;
    if (watt_BTU === 'BTU') {
        // แปลง BTU/SEER
        const SEER = parseFloat(document.getElementById('SEER').value)
        powerInWatts = power / SEER;
    }
    // คำนวณค่าไฟฟ้า
    const dailyConsumption = (powerInWatts * hours) / 1000;
    const total = dailyConsumption * unit_rate * 30;
    current_appliance=total;
    document.getElementById('total').innerText = total.toFixed(2);
    document.getElementById('total').innerText = `ค่าไฟของ ${name_electrical} คิดเป็น ${current_appliance.toFixed(2)} บาท`;
    document.getElementById('result').style.display = 'block';
}

//เพิ่่มตาราง รัน func นี้
function addtable(){
    const itemName = document.getElementById('name_electrical').value;
    const itemValue = current_appliance.toFixed(2);
    const count = num ;

    //เพิ่ม cell มาเพิ่มตรงนี้ 1
    const newItem = {
        count: count,
        name: itemName,
        value: itemValue
    };

    items.push(newItem);
    addItemToTable(newItem);
};

function addItemToTable(item) {
    const newRow = itemTableBody.insertRow();

    //เพิ่ม cell มาเพิ่มตรงนี้ 2
    const cellNum = newRow.insertCell(0);
    const cellName = newRow.insertCell(1);
    const cellValue = newRow.insertCell(2);

    num = num+1
    cellNum.textContent = item.count;
    cellName.textContent = item.name;
    cellValue.textContent = item.value;
    console.log(items);
    remind= remind+parseFloat(item.value);
    document.getElementById('total').innerText = `ค่าไฟฟ้าต่อเดือน: ${remind.toFixed(2)} บาท`;
}
