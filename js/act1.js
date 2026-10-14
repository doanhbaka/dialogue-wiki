const act1Data = [
    {
        speaker: "MR ROY",
        text: "The shipment from the dock was ambushed last night. Half of our consignment is gone. Care to explain why you were nowhere to be found?"
    },
    {
        speaker: "YOU",
        text: "I was tracking down the leak inside our own syndicate."
    },
    {
        type: "choices",
        options: [
            {
                text: "Blame the rival family for setting us up",
                next: [
                    {
                        speaker: "MR ROY",
                        text: "The Falcone family is bold, but they wouldn't dare cross our territory without inside help."
                    },
                    {
                        speaker: "YOU",
                        text: "Then I will dig deeper and find out who sold us out."
                    }
                ]
            },
            {
                text: "Confess that you were settling a personal debt",
                next: [
                    {
                        speaker: "MR ROY",
                        text: "Personal business comes second when the family's blood is on the line. Do not test my patience."
                    },
                    {
                        speaker: "YOU",
                        text: "Understood, MR ROY. It won't happen again."
                    }
                ]
            },
            {
                text: "Stay silent and hand over the encrypted ledger",
                next: [
                    {
                        speaker: "MR ROY",
                        text: "Hmph. Always letting your work speak for you. Let's see what names are in here..."
                    }
                ]
            }
        ]
    }
];