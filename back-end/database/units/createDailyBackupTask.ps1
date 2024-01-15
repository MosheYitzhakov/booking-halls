# Specify the task name and action
$TaskName = "DailyBackupTask"
$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "node --env-file=C:\Users\user\OneDrive\מסמכים\nodeJS\exercises\booking-halls\back-end\server\.env  C:\Users\user\OneDrive\מסמכים\nodeJS\exercises\booking-halls\back-end\database\units\createDatabaseDump.js"


# Specify the trigger for daily execution
$Trigger = New-ScheduledTaskTrigger -Daily -At "11:45 AM"


# Create the task
$Task = New-ScheduledTask -Action $Action -Trigger $Trigger -Settings (New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries)


# Register the task
Register-ScheduledTask -TaskName $TaskName -InputObject $Task