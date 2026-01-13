// ====================
// RESUMEOS - ENHANCED AI OPTIMIZER
// ====================
console.log("🚀 ResumeOS AI Optimizer Initialized!");

// 🔐 REPLACE THIS WITH YOUR OPENAI API KEY
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // Get from: https://platform.openai.com/api-keys

// Resume State
let resumeData = {
    personal: {
        name: 'Elon Musk',
        email: 'elon@spacex.com',
        phone: '+1 (555) 2024-2025',
        location: 'Mars Colony, SpaceX'
    },
    summary: 'Visionary engineer focused on making humanity multi-planetary.',
    experience: [
        {
            company: 'SpaceX',
            position: 'Chief Rocket Engineer',
            startDate: 'Q1 2022',
            endDate: 'Present',
            description: 'Led development of Starship spacecraft for Mars colonization.'
        }
    ],
    skills: ['Rocket Propulsion', 'Neural Networks', 'Quantum Computing']
};

let currentAnalysis = null;

// ====================
// INITIALIZATION
// ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Initializing enhanced AI optimizer...');
    
    // Setup mode switching
    setupModeSwitcher();
    
    // Setup all buttons
    setupAllButtons();
    
    // Create floating particles
    createParticles();
    
    // Update preview
    updatePreview();
    
    // Check API
    checkAPIKey();
    
    showMessage('🤖 AI Resume Optimizer Ready! Try both analysis methods.', 'success');
});

// ====================
// PARTICLE SYSTEM
// ====================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.6)`;
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ====================
// MODE SWITCHING UI
// ====================
function setupModeSwitcher() {
    const tabs = document.querySelectorAll('.mode-tab');
    const panels = document.querySelectorAll('.mode-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const mode = this.dataset.mode;
            
            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update panels
            panels.forEach(p => p.classList.remove('active'));
            document.getElementById(`${mode}Panel`).classList.add('active');
            
            showMessage(`📱 Switched to ${mode === 'upload' ? 'Upload & Match' : 'Website Analysis'} mode`, 'info');
        });
    });
}

// ====================
// SETUP ALL BUTTONS
// ====================
function setupAllButtons() {
    console.log('🔧 Setting up all buttons...');
    
    // ===== BUILDER BUTTONS =====
    document.getElementById('savePersonal')?.addEventListener('click', savePersonal);
    document.getElementById('addExperience')?.addEventListener('click', addExperience);
    document.getElementById('generatePDF')?.addEventListener('click', generatePDF);
    
    // Template buttons
    document.querySelectorAll('.template-select').forEach(btn => {
        btn.addEventListener('click', function() {
            selectTemplate(this.dataset.template);
        });
    });
    
    // ===== UPLOAD MODE BUTTONS =====
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('resumeUpload');
    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleFileUpload);
        
        // Add drag and drop
        const uploadZone = document.getElementById('uploadZone');
        if (uploadZone) {
            uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadZone.classList.add('dragover');
            });
            
            uploadZone.addEventListener('dragleave', () => {
                uploadZone.classList.remove('dragover');
            });
            
            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZone.classList.remove('dragover');
                if (e.dataTransfer.files.length) {
                    fileInput.files = e.dataTransfer.files;
                    const event = new Event('change', { bubbles: true });
                    fileInput.dispatchEvent(event);
                }
            });
        }
    }
    
    document.getElementById('analyzeBtn')?.addEventListener('click', () => {
        analyzeWithAI('upload');
    });
    
    // ===== URL MODE BUTTONS =====
    document.getElementById('fetchJobBtn')?.addEventListener('click', fetchJobFromURL);
    document.getElementById('analyzeURLBtn')?.addEventListener('click', () => {
        analyzeWithAI('url');
    });
    
    // ===== AI ACTION BUTTONS =====
    document.getElementById('applyKeywordsBtn')?.addEventListener('click', applyKeywords);
    document.getElementById('rewriteExperienceBtn')?.addEventListener('click', rewriteExperience);
    document.getElementById('enhanceSummaryBtn')?.addEventListener('click', enhanceSummary);
    document.getElementById('applyAllBtn')?.addEventListener('click', applyAllSuggestions);
    
    // Navigation
    document.getElementById('startBuilding')?.addEventListener('click', () => {
        document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('startBuilding2')?.addEventListener('click', () => {
        document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
    });
    
    console.log('✅ All buttons configured');
}

// ====================
// FILE UPLOAD HANDLER
// ====================
function handleFileUpload(event) {
    const file = event.target.files[0];
    const statusEl = document.getElementById('uploadStatus');
    
    if (!file) return;
    
    console.log('📁 File uploaded:', file.name);
    
    // Validate file
    const validTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(fileExt)) {
        showMessage('❌ Please upload PDF, DOC, DOCX, or TXT files only', 'error');
        return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showMessage('❌ File too large! Maximum size is 5MB', 'error');
        return;
    }
    
    // Update status with cool styling
    if (statusEl) {
        statusEl.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(0, 212, 255, 0.1); border-radius: 10px; border: 1px solid rgba(0, 212, 255, 0.3);">
                <i class="fas fa-file-alt" style="color: var(--primary); font-size: 1.2rem;"></i>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: var(--text-primary);">${file.name}</div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary);">
                        ${(file.size / 1024).toFixed(1)} KB • Ready for AI analysis
                    </div>
                </div>
                <i class="fas fa-check" style="color: var(--success);"></i>
            </div>
        `;
    }
    
    // Simulate file parsing
    simulateFileParsing(file);
}

function simulateFileParsing(file) {
    showMessage(`📄 Parsing "${file.name}"...`, 'info');
    
    setTimeout(() => {
        showMessage(`✅ "${file.name}" parsed successfully! AI can now analyze it.`, 'success');
    }, 1500);
}

// ====================
// FETCH JOB FROM URL
// ====================
async function fetchJobFromURL() {
    const urlInput = document.getElementById('jobURL');
    const url = urlInput.value.trim();
    
    if (!url) {
        showMessage('⚠️ Please enter a job URL', 'error');
        return;
    }
    
    // Validate URL
    try {
        new URL(url);
    } catch {
        showMessage('❌ Please enter a valid URL', 'error');
        return;
    }
    
    showMessage('🌐 Fetching job description from URL...', 'info');
    
    // Show loading in extracted job area
    const extractedDiv = document.getElementById('extractedJob');
    extractedDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div class="spinner" style="width: 40px; height: 40px; border: 3px solid var(--border-glass); border-top: 3px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
            <p style="color: var(--text-secondary);">Fetching job description from:<br><small style="word-break: break-all;">${url}</small></p>
        </div>
    `;
    
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes - in production, you'd use a backend proxy
        const jobDescription = await simulateURLFetching(url);
        
        // Display extracted content
        extractedDiv.innerHTML = `
            <div style="padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4 style="color: var(--primary); margin: 0;">📋 Extracted Job Description</h4>
                    <span style="font-size: 0.9rem; color: var(--success);">
                        <i class="fas fa-check"></i> Ready for AI Analysis
                    </span>
                </div>
                <div style="max-height: 300px; overflow-y: auto; padding: 1rem; background: rgba(255, 255, 255, 0.03); border-radius: 8px; font-size: 0.9rem; line-height: 1.5;">
                    ${jobDescription.split('\n').map(line => `<p style="margin-bottom: 0.5rem;">${line}</p>`).join('')}
                </div>
                <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                    <i class="fas fa-info-circle"></i> ${jobDescription.split(' ').length} words extracted
                </div>
            </div>
        `;
        
        // Also populate the job description textarea for upload mode
        document.getElementById('jobDescription').value = jobDescription;
        
        showMessage('✅ Job description fetched successfully!', 'success');
        
    } catch (error) {
        console.error('URL Fetch Error:', error);
        extractedDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--error);">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Failed to fetch job description</p>
                <p style="font-size: 0.9rem;">Try copying and pasting the description manually</p>
                <button onclick="useSampleJob()" class="btn" style="margin-top: 1rem; background: var(--primary);">
                    <i class="fas fa-magic"></i> Use Sample Job Instead
                </button>
            </div>
        `;
        showMessage('❌ Could not fetch from URL. Try manual paste.', 'error');
    }
}

async function simulateURLFetching(url) {
    // Sample job descriptions based on URL pattern
    if (url.includes('linkedin.com')) {
        return `Senior AI Engineer - Tech Innovations Inc.

Location: San Francisco, CA (Hybrid)
Experience: 5+ years in AI/ML

RESPONSIBILITIES:
• Design and implement scalable AI solutions using machine learning algorithms
• Develop and maintain backend services with Python, TensorFlow, and PyTorch
• Collaborate with data scientists to deploy models into production
• Optimize AI systems for performance and scalability
• Implement CI/CD pipelines for machine learning workflows
• Conduct code reviews and mentor junior engineers

REQUIREMENTS:
• Bachelor's or Master's in Computer Science or related field
• 5+ years of software development experience
• Strong proficiency in Python and machine learning frameworks
• Experience with cloud platforms (AWS, GCP, or Azure)
• Knowledge of Docker, Kubernetes, and microservices architecture
• Excellent problem-solving and communication skills

PREFERRED SKILLS:
• Experience with NLP or computer vision projects
• Knowledge of MLOps practices
• Contributions to open-source projects
• Published research in AI/ML field

BENEFITS:
• Competitive salary and equity package
• Comprehensive health insurance
• Flexible work hours and remote options
• Professional development budget`;
    } else if (url.includes('indeed.com')) {
        return `Software Developer - Web Technologies

We're looking for a talented Software Developer to join our growing team.

Key Responsibilities:
- Develop and maintain web applications using modern JavaScript frameworks
- Write clean, efficient, and well-documented code
- Collaborate with cross-functional teams to define and design new features
- Participate in code reviews and team meetings
- Troubleshoot and debug applications
- Stay updated with emerging technologies

Qualifications:
- 3+ years of experience in software development
- Proficiency in JavaScript, HTML, CSS
- Experience with React, Vue.js, or Angular
- Knowledge of Node.js and database systems
- Strong understanding of software development principles
- Bachelor's degree in Computer Science or related field

Technical Skills:
- JavaScript/TypeScript
- React.js or Vue.js
- Node.js
- REST APIs
- Git version control
- Agile methodologies

Soft Skills:
- Strong communication skills
- Problem-solving attitude
- Team player
- Adaptability
- Attention to detail`;
    }
    
    // Default generic job description
    return `Software Engineer Position

About the Role:
We are seeking a skilled Software Engineer to join our innovative team. You will be responsible for developing high-quality software solutions and collaborating with cross-functional teams.

Key Responsibilities:
• Develop and maintain software applications
• Write clean, efficient, and well-documented code
• Collaborate with team members on project planning and execution
• Participate in code reviews and quality assurance processes
• Troubleshoot and resolve technical issues

Requirements:
• Bachelor's degree in Computer Science or related field
• 3+ years of software development experience
• Proficiency in at least one programming language
• Strong problem-solving skills
• Excellent communication abilities

What We Offer:
• Competitive compensation package
• Health and wellness benefits
• Flexible working arrangements
• Professional growth opportunities
• Collaborative work environment`;
}

function useSampleJob() {
    const sampleJob = `Senior AI Engineer - San Francisco

We're looking for an experienced AI Engineer to join our team.

Responsibilities:
• Design and implement machine learning models
• Deploy AI solutions to production environments
• Collaborate with data scientists and engineers
• Optimize algorithms for performance and scalability

Requirements:
• 5+ years of AI/ML experience
• Proficiency in Python and TensorFlow/PyTorch
• Experience with cloud platforms (AWS/GCP)
• Strong understanding of algorithms and data structures

Skills Needed:
• Machine Learning
• Deep Learning
• Python Programming
• Cloud Computing
• Data Analysis
• Problem Solving

Benefits:
• Competitive salary
• Stock options
• Health insurance
• Remote work options`;
    
    document.getElementById('jobDescription').value = sampleJob;
    const extractedDiv = document.getElementById('extractedJob');
    extractedDiv.innerHTML = `
        <div style="padding: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h4 style="color: var(--primary); margin: 0;">📋 Sample Job Description</h4>
                <span style="font-size: 0.9rem; color: var(--success);">
                    <i class="fas fa-check"></i> Ready for Analysis
                </span>
            </div>
            <div style="max-height: 300px; overflow-y: auto; padding: 1rem; background: rgba(255, 255, 255, 0.03); border-radius: 8px;">
                ${sampleJob.split('\n').map(line => `<p style="margin-bottom: 0.5rem;">${line}</p>`).join('')}
            </div>
        </div>
    `;
    showMessage('✅ Sample job loaded. You can now analyze it.', 'success');
}

// ====================
// AI ANALYSIS CORE
// ====================
async function analyzeWithAI(mode) {
    let jobDescription = '';
    
    if (mode === 'upload') {
        jobDescription = document.getElementById('jobDescription').value.trim();
        if (!jobDescription) {
            showMessage('⚠️ Please paste a job description first', 'error');
            return;
        }
    } else if (mode === 'url') {
        const extractedDiv = document.getElementById('extractedJob');
        const text = extractedDiv.innerText || extractedDiv.textContent;
        if (text.includes('job description will appear here') || text.includes('Sample Job Description')) {
            // Allow sample job
            if (!text.includes('Sample Job Description')) {
                showMessage('⚠️ Please fetch a job description from URL first', 'error');
                return;
            }
        }
        jobDescription = text;
    }
    
    if (!jobDescription || jobDescription.length < 50) {
        showMessage('⚠️ Job description is too short', 'error');
        return;
    }
    
    // Check API key
    if (!OPENAI_API_KEY || OPENAI_API_KEY.includes('YOUR_OPENAI_API_KEY')) {
        showDemoAnalysis();
        return;
    }
    
    // Get resume text
    const resumeText = generateResumeText();
    
    // Show loading state
    showAILoading();
    
    try {
        console.log('🤖 Calling OpenAI API...');
        
        const analysis = await callOpenAIForAnalysis(jobDescription, resumeText);
        
        // Store analysis for later use
        currentAnalysis = analysis;
        
        // Display results
        displayAIAnalysis(analysis);
        
        // Show action buttons
        document.getElementById('actionButtons').style.display = 'block';
        
        showMessage(`✅ AI analysis complete! ${analysis.match_score}% match found`, 'success');
        
    } catch (error) {
        console.error('AI Analysis Error:', error);
        showAIError(error);
    }
}

async function callOpenAIForAnalysis(jobDescription, resumeText) {
    const prompt = `You are an expert resume strategist and ATS (Applicant Tracking System) specialist. 
    Analyze this resume against the provided job description and provide specific, actionable feedback.

    JOB DESCRIPTION:
    ${jobDescription}

    RESUME:
    ${resumeText}

    Provide your analysis in this EXACT JSON format:
    {
        "match_score": 85,
        "strengths": ["strength1", "strength2", "strength3"],
        "weaknesses": ["weakness1", "weakness2", "weakness3"],
        "keywords_missing": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
        "improved_experience": ["rewritten bullet point 1", "rewritten bullet point 2"],
        "improved_summary": "An enhanced professional summary that better matches the job",
        "action_items": ["action1", "action2", "action3", "action4"],
        "ats_score": 88,
        "confidence": "high"
    }

    Make the analysis specific, actionable, and professional. Focus on quantifiable improvements.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 1200
        })
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Clean and parse JSON
    const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanResponse);
}

// ====================
// DISPLAY AI RESULTS
// ====================
function displayAIAnalysis(analysis) {
    const resultsDiv = document.getElementById('analysisResults');
    
    resultsDiv.innerHTML = `
        <div style="max-width: 900px; margin: 0 auto;">
            <!-- Score Header -->
            <div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: linear-gradient(135deg, rgba(10,10,15,0.8), rgba(20,20,30,0.9)); border-radius: 20px; border: 1px solid var(--border-glass);">
                <div class="match-score">${analysis.match_score}%</div>
                <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1.5rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.2rem; font-weight: 600; color: var(--primary);">ATS Score</div>
                        <div style="font-size: 2rem; font-weight: 700; color: ${analysis.ats_score >= 90 ? '#00ff9d' : analysis.ats_score >= 80 ? '#ffbe0b' : '#ff3860'};">${analysis.ats_score}%</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.2rem; font-weight: 600; color: var(--primary);">Confidence</div>
                        <div style="font-size: 2rem; font-weight: 700; color: var(--secondary);">${analysis.confidence}</div>
                    </div>
                </div>
                <div class="progress-bar" style="margin: 2rem auto; max-width: 400px;">
                    <div class="progress-fill" style="width: ${analysis.match_score}%"></div>
                </div>
            </div>
            
            <!-- Two Column Layout -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <!-- Strengths -->
                <div class="analysis-item success">
                    <h4><i class="fas fa-check-circle"></i> Your Strengths</h4>
                    <ul style="margin-top: 1rem;">
                        ${analysis.strengths.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                
                <!-- Weaknesses -->
                <div class="analysis-item warning">
                    <h4><i class="fas fa-exclamation-triangle"></i> Areas to Improve</h4>
                    <ul style="margin-top: 1rem;">
                        ${analysis.weaknesses.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <!-- Missing Keywords -->
            <div class="analysis-item" style="border-left-color: var(--accent);">
                <h4><i class="fas fa-key"></i> Missing Keywords</h4>
                <p style="margin: 1rem 0 0.5rem 0; color: var(--text-secondary);">Add these to increase ATS score:</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
                    ${analysis.keywords_missing.map(kw => `
                        <span class="keyword-match" style="background: rgba(255, 0, 110, 0.15); color: var(--accent); border-color: rgba(255, 0, 110, 0.3);">
                            ${kw}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <!-- Improved Content -->
            <div style="margin-top: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <!-- Improved Experience -->
                <div class="analysis-item" style="border-left-color: var(--secondary);">
                    <h4><i class="fas fa-edit"></i> AI-Optimized Experience</h4>
                    <div style="margin-top: 1rem;">
                        ${analysis.improved_experience.map((exp, i) => `
                            <div style="margin-bottom: 1rem; padding: 1rem; background: rgba(157, 78, 221, 0.05); border-radius: 8px;">
                                <strong style="color: var(--secondary);">Suggestion ${i+1}:</strong>
                                <p style="margin-top: 0.5rem; color: var(--text-primary);">${exp}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Improved Summary -->
                <div class="analysis-item" style="border-left-color: var(--primary);">
                    <h4><i class="fas fa-sparkles"></i> Enhanced Summary</h4>
                    <div style="margin-top: 1rem; padding: 1rem; background: rgba(0, 212, 255, 0.05); border-radius: 8px;">
                        <p style="color: var(--text-primary); line-height: 1.6;">${analysis.improved_summary}</p>
                    </div>
                </div>
            </div>
            
            <!-- Action Items -->
            <div class="analysis-item" style="margin-top: 2rem; border-left-color: var(--success);">
                <h4><i class="fas fa-tasks"></i> Action Plan</h4>
                <div style="margin-top: 1rem;">
                    ${analysis.action_items.map((item, i) => `
                        <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.03); border-radius: 8px;">
                            <div style="color: var(--success); font-weight: bold; min-width: 24px;">${i+1}.</div>
                            <div style="color: var(--text-primary);">${item}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ====================
// AI ACTION FUNCTIONS
// ====================
function applyKeywords() {
    if (!currentAnalysis) return;
    
    const keywords = currentAnalysis.keywords_missing.slice(0, 5);
    let addedCount = 0;
    
    keywords.forEach(keyword => {
        if (!resumeData.skills.includes(keyword) && keyword.length > 3) {
            resumeData.skills.push(keyword);
            addedCount++;
        }
    });
    
    updatePreview();
    showMessage(`✅ Added ${addedCount} keywords to your resume`, 'success');
}

function rewriteExperience() {
    if (!currentAnalysis || !currentAnalysis.improved_experience.length) return;
    
    // Replace the first experience item with AI-improved version
    if (resumeData.experience.length > 0) {
        resumeData.experience[0].description = currentAnalysis.improved_experience[0];
    }
    
    updatePreview();
    showMessage('✅ Rewrote experience with AI improvements', 'success');
}

function enhanceSummary() {
    if (!currentAnalysis || !currentAnalysis.improved_summary) return;
    
    resumeData.summary = currentAnalysis.improved_summary;
    updatePreview();
    showMessage('✅ Enhanced professional summary', 'success');
}

function applyAllSuggestions() {
    applyKeywords();
    rewriteExperience();
    enhanceSummary();
    showMessage('🚀 Applied all AI optimizations!', 'success');
}

// ====================
// UI HELPER FUNCTIONS
// ====================
function showAILoading() {
    const resultsDiv = document.getElementById('analysisResults');
    resultsDiv.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem;">
            <div style="position: relative; width: 80px; height: 80px; margin: 0 auto 2rem;">
                <div style="position: absolute; width: 100%; height: 100%; border: 3px solid rgba(0, 212, 255, 0.2); border-radius: 50%;"></div>
                <div style="position: absolute; width: 100%; height: 100%; border: 3px solid var(--primary); border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite;"></div>
                <i class="fas fa-brain" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; color: var(--primary);"></i>
            </div>
            <h3 style="color: var(--primary); margin-bottom: 1rem;">AI Analysis in Progress</h3>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.5rem;">
                Our AI is analyzing your resume against the job description. This may take 20-30 seconds...
            </p>
            <div style="display: inline-block; padding: 0.5rem 1.5rem; background: rgba(0, 212, 255, 0.1); border-radius: 20px; color: var(--primary); font-size: 0.9rem;">
                <i class="fas fa-bolt"></i> Processing with GPT-3.5 Turbo
            </div>
            <div style="margin-top: 2rem; display: flex; justify-content: center; gap: 5px;">
                ${Array.from({length: 5}, (_, i) => `
                    <div style="width: 10px; height: 10px; background: var(--primary); border-radius: 50%; animation: pulse 1s ${i * 0.2}s infinite;"></div>
                `).join('')}
            </div>
            <style>
                @keyframes spin { 100% { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
            </style>
        </div>
    `;
}

function showAIError(error) {
    const resultsDiv = document.getElementById('analysisResults');
    resultsDiv.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--error);">
            <i class="fas fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 1.5rem;"></i>
            <h3>AI Analysis Failed</h3>
            <p style="margin: 1rem 0; color: var(--text-secondary);">${error.message}</p>
            <div style="margin-top: 2rem;">
                <button onclick="showDemoAnalysis()" class="btn" style="background: var(--primary); margin-right: 1rem;">
                    <i class="fas fa-eye"></i> Show Demo
                </button>
                <button onclick="analyzeWithAI('upload')" class="btn btn-outline">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        </div>
    `;
}

// ====================
// DEMO ANALYSIS
// ====================
function showDemoAnalysis() {
    const demo = {
        match_score: 82,
        strengths: [
            "Strong technical background aligns perfectly with engineering role",
            "Leadership experience matches senior position requirements",
            "Industry-specific knowledge in aerospace/tech",
            "Track record of innovation and achievement"
        ],
        weaknesses: [
            "Missing some modern tech stack keywords",
            "Quantifiable metrics could be more prominent",
            "Could better highlight soft skills",
            "ATS optimization could be improved"
        ],
        keywords_missing: ["Agile Methodology", "CI/CD", "MLOps", "Cloud Architecture", "Team Leadership"],
        improved_experience: [
            "Spearheaded development of Starship spacecraft using Agile methodologies, reducing time-to-market by 40%",
            "Implemented CI/CD pipelines that improved deployment frequency by 300%",
            "Led cross-functional teams of 50+ engineers in Mars colonization initiatives"
        ],
        improved_summary: "Visionary engineering leader with 5+ years of experience in aerospace technology and AI systems. Proven track record of leading large-scale projects from conception to deployment. Expert in modern tech stacks including cloud architecture, CI/CD, and machine learning operations. Passionate about pushing technological boundaries to solve humanity's greatest challenges.",
        action_items: [
            "Add 5-7 job-specific keywords to skills section",
            "Quantify achievements with specific metrics and percentages",
            "Incorporate modern tech stack terms (Agile, CI/CD, Cloud)",
            "Highlight leadership and team management experience",
            "Optimize for ATS with clear section headers and keywords"
        ],
        ats_score: 88,
        confidence: "high"
    };
    
    currentAnalysis = demo;
    displayAIAnalysis(demo);
    document.getElementById('actionButtons').style.display = 'block';
    showMessage('👁️ Showing demo analysis - add API key for real AI', 'info');
}

// ====================
// BUILDER FUNCTIONS
// ====================
function generateResumeText() {
    let text = `Name: ${resumeData.personal.name}\n`;
    text += `Email: ${resumeData.personal.email}\n`;
    text += `Location: ${resumeData.personal.location}\n\n`;
    
    text += `Professional Summary:\n${resumeData.summary}\n\n`;
    
    text += `Experience:\n`;
    resumeData.experience.forEach(exp => {
        text += `• ${exp.position} at ${exp.company}\n`;
        text += `  ${exp.startDate} - ${exp.endDate}\n`;
        text += `  ${exp.description}\n\n`;
    });
    
    text += `Skills:\n`;
    text += resumeData.skills.join(', ');
    
    return text;
}

function checkAPIKey() {
    if (!OPENAI_API_KEY || OPENAI_API_KEY.includes('YOUR_OPENAI_API_KEY')) {
        console.warn('⚠️ OpenAI API key not configured');
        const resultsDiv = document.getElementById('analysisResults');
        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div style="text-align: center; padding: 4rem 1rem; color: var(--text-secondary);">
                    <i class="fas fa-stars" style="font-size: 3rem; margin-bottom: 1.5rem; opacity: 0.5;"></i>
                    <h4>AI Analysis Ready</h4>
                    <p>Choose a method above to get real AI-powered resume optimization</p>
                    <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem;">
                        <div class="feature-badge">
                            <i class="fas fa-bolt"></i> Keyword Matching
                        </div>
                        <div class="feature-badge">
                            <i class="fas fa-shield-alt"></i> ATS Optimization
                        </div>
                        <div class="feature-badge">
                            <i class="fas fa-magic"></i> Auto-Improvement
                        </div>
                    </div>
                    <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(255, 190, 11, 0.1); border: 1px solid rgba(255, 190, 11, 0.3); border-radius: 12px; max-width: 500px; margin: 2rem auto;">
                        <h4 style="color: #ffbe0b; margin-bottom: 0.5rem;"><i class="fas fa-key"></i> API Key Required for Real AI</h4>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.9rem;">Replace "YOUR_OPENAI_API_KEY_HERE" in app.js with your OpenAI API key.</p>
                        <button onclick="showDemoAnalysis()" class="btn" style="background: #ffbe0b; color: black;">
                            <i class="fas fa-eye"></i> Try Demo Analysis
                        </button>
                    </div>
                </div>
            `;
        }
    }
}

function savePersonal() {
    resumeData.personal = {
        name: getValue('inputName') || 'Your Name',
        email: getValue('inputEmail') || 'email@example.com',
        phone: getValue('inputPhone') || '+1 (555) 1234',
        location: getValue('inputLocation') || 'Your Location'
    };
    
    updatePreview();
    showMessage('✅ Personal info saved!', 'success');
}

function addExperience() {
    const company = getValue('inputCompany');
    const position = getValue('inputPosition');
    
    if (!company || !position) {
        showMessage('⚠️ Please fill Company and Position', 'error');
        return;
    }
    
    const newExp = {
        company: company,
        position: position,
        startDate: getValue('inputStartDate') || 'Date',
        endDate: getValue('inputEndDate') || 'Present',
        description: getValue('inputDescription') || 'Description'
    };
    
    resumeData.experience.push(newExp);
    
    ['inputCompany', 'inputPosition', 'inputStartDate', 'inputEndDate', 'inputDescription'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    
    updatePreview();
    showMessage(`✅ Added ${position} at ${company}`, 'success');
}

function selectTemplate(template) {
    document.querySelectorAll('.template-select').forEach(btn => {
        btn.style.opacity = '0.7';
        btn.style.transform = 'scale(1)';
    });
    
    const activeBtn = event.target;
    activeBtn.style.opacity = '1';
    activeBtn.style.transform = 'scale(1.05)';
    
    const preview = document.getElementById('resumePreview');
    if (preview) {
        const colors = {
            'neon': '#00d4ff',
            'quantum': '#9d4edd', 
            'cyber': '#ff006e',
            'holo': '#00ff9d'
        };
        preview.style.border = `2px solid ${colors[template] || '#00d4ff'}`;
        preview.style.boxShadow = `0 0 20px ${colors[template] || '#00d4ff'}40`;
    }
    
    showMessage(`✅ ${template} template activated`, 'info');
}

function updatePreview() {
    const nameEl = document.getElementById('previewName');
    if (nameEl) nameEl.textContent = resumeData.personal.name;
    
    const contactEl = document.getElementById('previewContact');
    if (contactEl) {
        const contactInfo = [
            resumeData.personal.email,
            resumeData.personal.phone,
            resumeData.personal.location
        ].filter(Boolean).join(' | ');
        contactEl.innerHTML = `<p>${contactInfo}</p>`;
    }
    
    const summaryEl = document.getElementById('previewSummary');
    if (summaryEl) summaryEl.textContent = resumeData.summary;
    
    const expEl = document.getElementById('previewExperience');
    if (expEl) {
        expEl.innerHTML = resumeData.experience.map(exp => `
            <div class="experience-item">
                <div class="job-title">${exp.position}</div>
                <div class="company">${exp.company}</div>
                <div class="date">${exp.startDate} - ${exp.endDate}</div>
                <p>${exp.description}</p>
            </div>
        `).join('');
    }
    
    const skillsEl = document.getElementById('previewSkills');
    if (skillsEl) {
        skillsEl.innerHTML = `<p>${resumeData.skills.join(', ')}</p>`;
    }
}

function generatePDF() {
    showMessage('⚡ Creating PDF...', 'info');
    
    try {
        if (typeof window.jspdf === 'undefined') {
            throw new Error('PDF library not loaded');
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        doc.text(resumeData.personal.name, 105, 20, { align: 'center' });
        
        // Contact info
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        const contactLine = [
            resumeData.personal.email,
            resumeData.personal.phone,
            resumeData.personal.location
        ].filter(Boolean).join(' | ');
        doc.text(contactLine, 105, 30, { align: 'center' });
        
        // Summary
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Professional Summary', 20, 50);
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        const summaryLines = doc.splitTextToSize(resumeData.summary, 170);
        doc.text(summaryLines, 20, 60);
        
        let y = 70 + (summaryLines.length * 5);
        
        // Experience
        if (resumeData.experience.length > 0) {
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Work Experience', 20, y);
            y += 10;
            
            resumeData.experience.forEach(exp => {
                if (y > 250) {
                    doc.addPage();
                    y = 20;
                }
                
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text(exp.position, 20, y);
                
                doc.setFontSize(11);
                doc.setFont(undefined, 'normal');
                doc.text(`at ${exp.company}`, 20 + doc.getTextWidth(exp.position) + 5, y);
                
                doc.setFontSize(10);
                doc.text(`${exp.startDate} - ${exp.endDate}`, 20, y + 7);
                
                const descLines = doc.splitTextToSize(exp.description, 170);
                doc.setFontSize(11);
                doc.text(descLines, 25, y + 15);
                
                y += 25 + (descLines.length * 5);
            });
        }
        
        // Skills
        if (y > 240) {
            doc.addPage();
            y = 20;
        }
        
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Skills', 20, y);
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.text(resumeData.skills.join(', '), 20, y + 10);
        
        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text('Generated by ResumeOS • ' + new Date().toLocaleDateString(), 105, 285, { align: 'center' });
        
        const fileName = `Resume_${resumeData.personal.name.replace(/\s+/g, '_')}.pdf`;
        doc.save(fileName);
        
        showMessage(`✅ PDF saved as ${fileName}`, 'success');
        
    } catch (error) {
        console.error('PDF Error:', error);
        showMessage('❌ PDF failed. Downloading text version...', 'error');
        downloadTextVersion();
    }
}

function downloadTextVersion() {
    const text = generateResumeText();
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Resume_${resumeData.personal.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showMessage('✅ Text resume downloaded as backup', 'success');
}

// ====================
// UTILITY FUNCTIONS
// ====================
function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

function showMessage(message, type = 'info') {
    // Remove old messages
    document.querySelectorAll('.notification').forEach(el => el.remove());
    
    const colors = {
        info: '#00d4ff',
        success: '#00ff9d',
        error: '#ff3860',
        warning: '#ffbe0b'
    };
    
    const icons = {
        info: 'fa-info-circle',
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-bolt'
    };
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas ${icons[type]}" style="font-size: 1.2rem; color: ${colors[type]};"></i>
            <div>
                <div style="font-weight: 600; color: var(--text-primary);">${message}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">ResumeOS AI</div>
            </div>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: rgba(10, 10, 15, 0.95);
        padding: 16px 20px;
        border-radius: 12px;
        border-left: 4px solid ${colors[type]};
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ====================
// INITIALIZATION COMPLETE
// ====================
console.log("✅ ResumeOS Enhanced AI Optimizer Loaded!");
console.log("🔑 API Key Status:", OPENAI_API_KEY && !OPENAI_API_KEY.includes('YOUR_OPENAI_API_KEY') ? "Configured" : "Not configured");
console.log("💾 Resume Data Loaded");