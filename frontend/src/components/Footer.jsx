import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉 Good job! You have completed <b> {completedTasksCount}</b>
                {activeTasksCount > 0 &&
                  `, continue to complete  ${activeTasksCount} active tasks. try to finish them!`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                You have <b>{activeTasksCount} </b>active tasks. Let's get to
                work!
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
