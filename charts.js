document.addEventListener('DOMContentLoaded', function() {
    // Chart 1: Industry vs. Individual CO₂ Emissions
    const industryVsIndividual = document.getElementById('chartIndustryVsIndividual');
    if (industryVsIndividual) {
        new Chart(industryVsIndividual, {
            type: 'pie',
            data: {
                labels: ['Industrial Emissions', 'Individual Emissions'],
                datasets: [{
                    data: [90, 10],
                    backgroundColor: [
                        'rgba(13, 202, 240, 0.8)',
                        'rgba(173, 181, 189, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14 },
                        bodyFont: { size: 13 },
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        },
                        position: 'nearest'
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    }

    // Chart 2: Industry Breakdown
    const industryBreakdown = document.getElementById('chartIndustryBreakdown');
    if (industryBreakdown) {
        new Chart(industryBreakdown, {
            type: 'bar',
            data: {
                labels: ['Manufacturing', 'Transport', 'Energy', 'Agriculture', 'Construction'],
                datasets: [{
                    label: 'Emissions by Sector',
                    data: [28, 24, 22, 16, 10],
                    backgroundColor: 'rgba(13, 202, 240, 0.8)',
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        callbacks: {
                            label: function(context) {
                                return `${context.raw}% of Industrial Emissions`;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 30,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    y: {
                        ticks: {
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    }
});
