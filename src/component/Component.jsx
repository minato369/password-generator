import React, { useState } from 'react'
import './Component.css'
import copyImage from '../assets/icon-copy.svg'
import rightArrow from '../assets/icon-arrow-right.svg'
const Component = () => {
	//rangeController is password length
	const [rangeController, setRangeController] = useState(12);
	const [password, setPassword] = useState('');
	const [option, setOption] = useState({
		uppercase: false,
		lowercase: true,
		numbers: true,
		symbols: false,
	})

	const [passwordStrength, setPasswordStrength] = useState({
		level: 'Poor',
		color: 'var(--red-clr)',
		bars: 1
	})

	const maxRange = 25;
	const percentage = (rangeController / maxRange) * 100;
	
	const sliderStyle = {
		background: `linear-gradient(to right, var(--green-clr) ${percentage}%, var(--bg-clr) ${percentage}%)`
	};

	const handleOptionValue = (e) => {
		const { name, checked } = e.target;
		setOption((prev) => ({
			...prev,
			[name]: checked
		}))
	}

	const generatePassword = () => {
		let str = ''
		let pass = '';
		let uppercaseLetter = 'ABCDEFGHIJKLMNOPQRSTUVWQYZ'
		let lowercaseLetter = 'abcdefghijklmnopqrstuvwxyz'
		let numbersString = '0123456789'
		let symbolsString = "!@#$%^&*()_+[]{}|;:',.<>?/~`";

		if (option.uppercase == true) str += uppercaseLetter
		if (option.lowercase == true) str += lowercaseLetter
		if (option.numbers == true) str += numbersString
		if (option.symbols == true) str += symbolsString

		for (let i = 0; i <= rangeController; i++) {
			const randomElement = Math.floor(Math.random() * str.length);
			pass += str[randomElement];
		}

		setPassword(pass);
		handlePasswordStrength();
	}

	const handleCopyToClipboard = () => {
		if (password) {
			navigator.clipboard.writeText(password);
		}
	}

	const handlePasswordStrength = () => {
		const length = Number(rangeController);
		let strength = 0;

		if (option.uppercase) strength++;
		if (option.lowercase) strength++;
		if (option.numbers) strength++;
		if (option.symbols) strength++;

		if (length < 6) {
			setPasswordStrength({ level: 'Poor', color: 'var(--red-clr)', bars: 1 });
		} else if (length < 10) {
			if (strength >= 3) {
				setPasswordStrength({ level: 'Medium', color: 'var(--orange-clr)', bars: 2 });
			} else {
				setPasswordStrength({ level: 'Poor', color: 'var(--red-clr)', bars: 1 });
			}
		} else if (length < 14) {
			if (strength >= 3) {
				setPasswordStrength({ level: 'Strong', color: 'var(--yellow-clr)', bars: 3 });
			} else {
				setPasswordStrength({ level: 'Medium', color: 'var(--orange-clr)', bars: 2 });
			}
		} else {
			if (strength === 4) {
				setPasswordStrength({ level: 'Very Strong', color: 'var(--green-clr)', bars: 4 });
			} else {
				setPasswordStrength({ level: 'Strong', color: 'var(--yellow-clr)', bars: 3 });
			}
		}
	};


	return (
		<div className='pass-genrator-container'>
			<div className='top-section'>
				<p>{password}</p>
				<img src={copyImage} alt="copy" onClick={handleCopyToClipboard} />
			</div>

			<div className='main-section'>
				<header className='main-seaction-header'>
					<h3>Character length</h3>
					<p>{rangeController}</p>
				</header>

				<section className='main-seaction-range'>
					<input type="range" min="0" max="25" value={rangeController} onChange={(e) => setRangeController(e.target.value)} style={sliderStyle} />
				</section>

				<section className='main-section-checkbox-group'>
					<div className='checkbox-group'><label><input type='checkbox' onChange={handleOptionValue} name='uppercase' checked={option.uppercase} />Include Uppercase Letters</label></div>
					<div className='checkbox-group'><label><input type='checkbox' onChange={handleOptionValue} name='lowercase' checked={option.lowercase} />Include Lowercase Letters</label></div>
					<div className='checkbox-group'><label><input type='checkbox' onChange={handleOptionValue} name='numbers' checked={option.numbers} />Include Numbers</label></div>
					<div className='checkbox-group'><label><input type='checkbox' onChange={handleOptionValue} name='symbols' checked={option.symbols} />Include Symbols</label></div>
				</section>

				<section className='main-section-password-strength'>
					<div className='password-strength-group'>STRENGTH</div>
					<div className='password-strength-group'>
						<div className='password-strength-text'>{passwordStrength.level}</div>
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className='strength-bar'
								style={{
									backgroundColor: i <= passwordStrength.bars ? passwordStrength.color : 'transparent',
									border: '1px solid var(--white-clr)'
								}}
							></div>
						))}
					</div>
				</section>

				<section className='main-section-password-button'>
					<button className='password-generate-btn' onClick={generatePassword}>GENERATE <img src={rightArrow} alt="copy" /></button>
				</section>
			</div>
		</div>
	)
}

export default Component
