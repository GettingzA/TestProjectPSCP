from flask import Flask,render_template,request
web = Flask(__name__)

def calculate_cost (power, hours, unit):
    return power * hours * unit

@web.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name_electrical = input(request.form['name_electrical'])
        unit = int(request.form['unit'])
        power = float(request.form['power'])
        hours = float(request.form['hours'])
        Watt_BTU = request.form['unit']
        
        if Watt_BTU == 'BTU':
            power = power * 0.293071 # 1 btu = 0.293071 WATT
        else:
            total = calculate_cost(name_electrical, power, hours, unit)
            return render_template('index.html', total=total)
    return render_template('index.html')

if __name__ == "__main__":
    web.run(debug=True)

